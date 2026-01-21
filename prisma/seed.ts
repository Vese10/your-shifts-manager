import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // 1. Create System Permissions
  const permissions = [
    // Shifts
    { key: 'shift.viewAll', module: 'shift', description: 'View all shifts' },
    { key: 'shift.viewSelf', module: 'shift', description: 'View own shifts' },
    { key: 'shift.create', module: 'shift', description: 'Create new shifts' },
    {
      key: 'shift.publish',
      module: 'shift',
      description: 'Publish shifts',
      riskLevel: 'MEDIUM',
    },
    {
      key: 'shift.delete',
      module: 'shift',
      description: 'Delete shifts',
      riskLevel: 'HIGH',
    },

    // Requests
    {
      key: 'request.createSelf',
      module: 'request',
      description: 'Create request for self',
    },
    {
      key: 'request.approve',
      module: 'request',
      description: 'Approve requests',
      riskLevel: 'MEDIUM',
    },

    // Attendance
    {
      key: 'attendance.checkInSelf',
      module: 'attendance',
      description: 'Check-in for self',
    },
    {
      key: 'attendance.viewAll',
      module: 'attendance',
      description: 'View all attendance records',
    },
  ];

  for (const p of permissions) {
    await prisma.permission.upsert({
      where: { key: p.key },
      update: {},
      create: p,
    });
  }

  // 2. Create Global System Role Templates (companyId: null)
  // Note: Your schema uses companyId as optional, so null implies a global template or system role.

  // OWNER
  const ownerRole = await prisma.role.upsert({
    where: { companyId_key: { companyId: 'SYSTEM_TEMPLATE', key: 'OWNER' } }, // specialized ID or composite unique handling needed if companyId is nullable unique constraint issue
    // Actually, unique([companyId, key]) allows multiple nulls in standard SQL but Prisma logic might vary.
    // For safety, let's assume we create them when a company is created or just have a reference list here.
    // Spec says: "Crea 4 ruoli system PER COMPANY". Meaning we seed them when we create a company.
    // But we can store "Templates" here if we want.
    // Let's CREATE A DEMO COMPANY and seed its roles to verify the structures.
    update: {},
    create: {
      companyId: 'SYSTEM_TEMPLATE', // Hack to satisfy composite unique if null is tricky or just use a placeholder
      key: 'OWNER',
      name: 'Owner (Template)',
      isSystem: true,
    },
  });

  console.log('Seed completed.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
