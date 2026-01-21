'use client';

import React from 'react';
import { usePermission } from '@/hooks/usePermission';
import { PermissionKey, ResourceScope } from '@/lib/rbac';

interface PermissionGuardProps {
  children: React.ReactNode;
  permission: PermissionKey;
  scope?: ResourceScope;
  fallback?: React.ReactNode;
}

export function PermissionGuard({
  children,
  permission,
  scope,
  fallback = null,
}: PermissionGuardProps) {
  const hasAccess = usePermission(permission, scope);

  if (!hasAccess) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
