'use client';

import { PermissionGuard } from '@/components/auth/PermissionGuard';
import { PERMISSIONS } from '@/lib/rbac';
import { useCompany } from '@/context/CompanyContext';

export default function DashboardPage() {
  const { company, member } = useCompany();

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">Welcome to {company?.name}!</h1>
      <p className="mb-8">Your status: {member?.status}</p>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">RBAC Verification</h2>

        <PermissionGuard permission={PERMISSIONS.COMPANY_UPDATE}>
          <div className="rounded border border-green-400 bg-green-100 p-4 text-green-700">
            ✅ You can UPDATE COMPANY (OWNER/ADMIN Only)
          </div>
        </PermissionGuard>

        <PermissionGuard permission={PERMISSIONS.SHIFT_VIEW_ALL}>
          <div className="rounded border border-blue-400 bg-blue-100 p-4 text-blue-700">
            ✅ You can VIEW ALL SHIFTS (Owner/Manager/Supervisor)
          </div>
        </PermissionGuard>

        <PermissionGuard
          permission={PERMISSIONS.GDPR_DELETE_USER}
          fallback={
            <div className="rounded border border-gray-400 bg-gray-100 p-4 text-gray-700">
              ℹ️ You CANNOT Delete Users (Fallback shown)
            </div>
          }
        >
          <div className="rounded border border-red-400 bg-red-100 p-4 text-red-700">
            ✅ You can DELETE USERS (High Risk!)
          </div>
        </PermissionGuard>

        <PermissionGuard permission={PERMISSIONS.USER_INVITE}>
          <div className="rounded border border-purple-400 bg-purple-100 p-4 text-purple-700">
            ✅ You can INVITE USERS
          </div>
        </PermissionGuard>

        <PermissionGuard permission={PERMISSIONS.DEPARTMENT_CREATE}>
          <div className="rounded border border-yellow-400 bg-yellow-100 p-4 text-yellow-700">
            ✅ You can CREATE DEPARTMENTS
          </div>
        </PermissionGuard>
      </div>
    </div>
  );
}
