'use client';

import { useCompany } from '@/context/CompanyContext';
import { hasPermission, PermissionKey, ResourceScope } from '@/lib/rbac';

export function usePermission(
  permission: PermissionKey,
  scope: ResourceScope = {}
) {
  const { member } = useCompany();

  if (!member) {
    return false;
  }

  // Map member to RbacUser structure
  const rbacUser = {
    id: member.userId,
    assignments: member.assignments,
  };

  return hasPermission(rbacUser, permission, scope);
}
