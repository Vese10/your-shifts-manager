import 'dotenv/config';
import { prisma } from '../src/lib/prisma';

import { PERMISSIONS, HIGH_RISK_PERMISSIONS } from '../src/lib/rbac';

// --- HELPERS ---

// Map of Role Key -> List of Permissions (or rules to filter them)
// For simplicity in this seed, we'll define explicit lists or huge filters.
// OWNER: All permissions.
const getOwnerPermissions = () => Object.values(PERMISSIONS);

// MANAGER: Operational (Scheduling, Requests, Attendance, Reports, Employee mgmt)
// Exclude: Billing, Integrations, Company Settings (except name/branding view), Audit, GDPR, high level Policy overrides.
const getManagerPermissions = () => {
  const all = Object.values(PERMISSIONS);
  const EXCLUDED_PREFIXES = [
    'company.update',
    'company.manage', // Keep company.view
    'location.create',
    'location.delete', // Manager usually edits, maybe not create/delete locations? Spec says OWNER/ADMIN.
    'department.create',
    'department.delete',
    'user.delete',
    'user.import',
    'role.',
    'permission.',
    'audit.',
    'data.',
    'gdpr.',
    'integration.',
    'policy.update',
    'policy.set', // View ok
    'support.impersonate',
  ];

  return all.filter(
    (p) => !EXCLUDED_PREFIXES.some((prefix) => p.startsWith(prefix))
  );
};

// SUPERVISOR: Day to day
const getSupervisorPermissions = () => [
  PERMISSIONS.SHIFT_VIEW_ALL,
  PERMISSIONS.SHIFT_VIEW_NOTES,
  PERMISSIONS.SHIFT_ADD_NOTES,
  PERMISSIONS.ATTENDANCE_VIEW_ALL,
  PERMISSIONS.ATTENDANCE_MARK_PRESENT,
  PERMISSIONS.ATTENDANCE_MARK_ABSENT,
  PERMISSIONS.ATTENDANCE_MARK_LATE,
  PERMISSIONS.USER_VIEW,
  PERMISSIONS.EMPLOYEE_VIEW,
  PERMISSIONS.ANNOUNCEMENT_VIEW,
  PERMISSIONS.ANNOUNCEMENT_CREATE, // Optional in map
  PERMISSIONS.COVERAGE_VIEW,
  PERMISSIONS.REPORT_VIEW, // Subset
];

// EMPLOYEE: Self
const getEmployeePermissions = () =>
  Object.values(PERMISSIONS).filter(
    (p) =>
      p.includes('Self') ||
      p.includes('Me') ||
      p === PERMISSIONS.ANNOUNCEMENT_VIEW ||
      p === PERMISSIONS.SHIFT_VIEW_SELF
  );

async function main() {
  console.log('Seeding...');

  // 1. Seed Permissions
  console.log('Seeding Permissions...');
  const allPermissions = Object.values(PERMISSIONS);

  for (const permKey of allPermissions) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isHighRisk = HIGH_RISK_PERMISSIONS.includes(permKey as any);
    const permModule = permKey.split('.')[0];

    await prisma.permission.upsert({
      where: { key: permKey },
      update: {
        riskLevel: isHighRisk ? 'HIGH' : 'LOW',
        module: permModule,
      },
      create: {
        key: permKey,
        module: permModule,
        riskLevel: isHighRisk ? 'HIGH' : 'LOW',
        description: `Permission for ${permKey}`,
      },
    });
  }

  // 2. Setup Company & User (Demo)
  const userEmail = 'demo@example.com';
  const companySlug = 'demo-company';

  const user = await prisma.user.upsert({
    where: { email: userEmail },
    update: {},
    create: {
      email: userEmail,
      name: 'Demo User',
      id: 'user_demo_id',
    },
  });

  const company = await prisma.company.upsert({
    where: { slug: companySlug },
    update: {},
    create: {
      name: 'Demo Company',
      slug: companySlug,
    },
  });

  // 3. Create System Roles (Global Templates - companyId: null)
  // We'll create them as templates. Alternatively, we can create them FOR the demo company.
  // The specs mention "preset ruoli system". Let's create them for the Demo Company for now to be concrete.

  const ROLES_DEF = [
    { key: 'OWNER', name: 'Owner', perms: getOwnerPermissions() },
    { key: 'MANAGER', name: 'Manager', perms: getManagerPermissions() },
    {
      key: 'SUPERVISOR',
      name: 'Supervisor',
      perms: getSupervisorPermissions(),
    },
    { key: 'EMPLOYEE', name: 'Employee', perms: getEmployeePermissions() },
  ];

  for (const roleDef of ROLES_DEF) {
    console.log(`Seeding Role: ${roleDef.key}`);
    const role = await prisma.role.upsert({
      where: {
        companyId_key: {
          companyId: company.id,
          key: roleDef.key,
        },
      },
      update: {},
      create: {
        companyId: company.id,
        key: roleDef.key,
        name: roleDef.name,
        isSystem: true,
        description: `System Role: ${roleDef.name}`,
      },
    });

    // Assign Permissions to Role
    // We'll do a bulk delete/create or just upsert loop.
    // Optimization: fetch existing, calc diff. For seed, loop upsert is 'safe' but slow.
    // Given we have ~100 perms, let's just do it.

    // First, map permission keys to IDs
    const permKeys = roleDef.perms;
    const permissions = await prisma.permission.findMany({
      where: { key: { in: permKeys } },
      select: { id: true, key: true },
    });

    for (const p of permissions) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: role.id,
            permissionId: p.id,
          },
        },
        update: {},
        create: {
          roleId: role.id,
          permissionId: p.id,
          effect: 'ALLOW',
        },
      });
    }
  }

  // 4. Create Membership & Assignment
  await prisma.companyMember.upsert({
    where: {
      companyId_userId: {
        companyId: company.id,
        userId: user.id,
      },
    },
    update: {
      status: 'ACTIVE',
    },
    create: {
      companyId: company.id,
      userId: user.id,
      status: 'ACTIVE',
    },
  });

  // Assign OWNER role to Demo User
  // Check if assignment exists
  const ownerRole = await prisma.role.findUnique({
    where: { companyId_key: { companyId: company.id, key: 'OWNER' } },
  });

  if (ownerRole) {
    await prisma.userRoleAssignment.upsert({
      where: {
        // We don't have a unique constraint on assignment per se (schema says ID),
        // but effectively we probably want one role per scope?
        // Schema: assignments UserRoleAssignment[]
        // We'll search first or just create if not exists.
        id: 'demo_owner_assignment', // Hacking a static ID for upsert stability in seed
      },
      update: {},
      create: {
        id: 'demo_owner_assignment',
        companyId: company.id,
        userId: user.id,
        roleId: ownerRole.id,
        scopeType: 'COMPANY',
        isActive: true,
      },
    });
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
