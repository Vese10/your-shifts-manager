export const PERMISSIONS = {
  // 1. AUTH / ACCOUNT
  AUTH_LOGIN: 'auth.login',
  AUTH_SIGNUP: 'auth.signup',
  AUTH_LOGOUT: 'auth.logout',
  ACCOUNT_UPDATE_PROFILE: 'account.updateProfile',
  ACCOUNT_CHANGE_PASSWORD: 'account.changePassword',
  ACCOUNT_MANAGE_2FA: 'account.manage2FA',
  ACCOUNT_VIEW_SESSIONS: 'account.viewSessions',
  ACCOUNT_REVOKE_SESSION: 'account.revokeSession',
  SUPPORT_IMPERSONATE_USER: 'support.impersonateUser', // HIGH RISK

  // 2. COMPANY & STRUCTURE
  COMPANY_VIEW: 'company.view',
  COMPANY_UPDATE: 'company.update',
  COMPANY_MANAGE_BRANDING: 'company.manageBranding',
  COMPANY_MANAGE_LOCALIZATION: 'company.manageLocalization',

  LOCATION_CREATE: 'location.create',
  LOCATION_UPDATE: 'location.update',
  LOCATION_DELETE: 'location.delete',
  LOCATION_VIEW: 'location.view',

  DEPARTMENT_CREATE: 'department.create',
  DEPARTMENT_UPDATE: 'department.update',
  DEPARTMENT_DELETE: 'department.delete',
  DEPARTMENT_VIEW: 'department.view',

  OPENING_HOURS_MANAGE: 'openingHours.manage',
  CLOSURES_MANAGE: 'closures.manage',
  HOLIDAYS_MANAGE: 'holidays.manage',

  // 3. USERS / ROLES
  USER_INVITE: 'user.invite',
  USER_IMPORT_CSV: 'user.importCSV',
  USER_VIEW: 'user.view',
  USER_UPDATE: 'user.update',
  USER_DEACTIVATE: 'user.deactivate', // HIGH RISK
  USER_REACTIVATE: 'user.reactivate',
  USER_DELETE: 'user.delete', // HIGH RISK

  ROLE_ASSIGN: 'role.assign',
  ROLE_VIEW: 'role.view',
  PERMISSION_MANAGE_RBAC: 'permission.manageRBAC',

  ASSIGNMENT_SET_SCOPE: 'assignment.setScope',
  TEAM_MANAGE: 'team.manage',

  // 4. EMPLOYEE PROFILE
  EMPLOYEE_CREATE: 'employee.create',
  EMPLOYEE_UPDATE: 'employee.update',
  EMPLOYEE_VIEW: 'employee.view',
  EMPLOYEE_TERMINATE: 'employee.terminate',
  EMPLOYEE_MANAGE_SKILLS: 'employee.manageSkills',
  EMPLOYEE_MANAGE_CONTRACT: 'employee.manageContract',
  EMPLOYEE_MANAGE_HOURLY_RATE: 'employee.manageHourlyRate', // SENSIBLE
  EMPLOYEE_MANAGE_NOTES_INTERNAL: 'employee.manageNotesInternal',

  // 5. AVAILABILITY
  AVAILABILITY_VIEW_ALL: 'availability.viewAll',
  AVAILABILITY_SET_FOR_SELF: 'availability.setForSelf',
  AVAILABILITY_SET_FOR_EMPLOYEE: 'availability.setForEmployee',
  AVAILABILITY_CREATE_EXCEPTION_SELF: 'availability.createExceptionSelf',
  AVAILABILITY_CREATE_EXCEPTION_FOR_EMPLOYEE:
    'availability.createExceptionForEmployee',
  AVAILABILITY_LOCK: 'availability.lock',

  // 6. POLICIES
  POLICY_VIEW: 'policy.view',
  POLICY_UPDATE: 'policy.update',
  POLICY_OVERRIDE: 'policy.override', // HIGH RISK
  POLICY_SET_WARNINGS_VS_BLOCKS: 'policy.setWarningsVsBlocks',
  POLICY_MANAGE_OVERTIME_RULES: 'policy.manageOvertimeRules',
  POLICY_MANAGE_ABSENCE_RULES: 'policy.manageAbsenceRules',

  // 7. SCHEDULING / SHIFTS
  SHIFT_CREATE: 'shift.create',
  SHIFT_UPDATE: 'shift.update',
  SHIFT_DELETE: 'shift.delete',
  SHIFT_VIEW_ALL: 'shift.viewAll',
  SHIFT_VIEW_SELF: 'shift.viewSelf',

  SHIFT_ASSIGN_EMPLOYEE: 'shift.assignEmployee',
  SHIFT_UNASSIGN_EMPLOYEE: 'shift.unassignEmployee',
  SHIFT_REASSIGN_EMPLOYEE: 'shift.reassignEmployee',
  SHIFT_BULK_ASSIGN: 'shift.bulkAssign',

  SHIFT_TEMPLATE_MANAGE: 'shiftTemplate.manage',
  WEEK_PATTERN_MANAGE: 'weekPattern.manage',
  SCHEDULE_CLONE_PERIOD: 'schedule.clonePeriod',

  SCHEDULE_SAVE_DRAFT: 'schedule.saveDraft',
  SCHEDULE_PUBLISH: 'schedule.publish',
  SCHEDULE_UNPUBLISH: 'schedule.unpublish', // HIGH RISK
  SCHEDULE_LOCK_PERIOD: 'schedule.lockPeriod', // HIGH RISK
  SCHEDULE_NOTIFY_EMPLOYEES: 'schedule.notifyEmployees',

  SHIFT_ADD_NOTES: 'shift.addNotes',
  SHIFT_VIEW_NOTES: 'shift.viewNotes',

  // 8. COVERAGE
  COVERAGE_MANAGE_REQUIREMENTS: 'coverage.manageRequirements',
  COVERAGE_VIEW: 'coverage.view',
  COVERAGE_RESOLVE_UNDERSTAFFING: 'coverage.resolveUnderstaffing',
  COVERAGE_SET_SKILL_MINIMUMS: 'coverage.setSkillMinimums',

  // 9. REQUESTS
  REQUEST_CREATE_SELF: 'request.createSelf',
  REQUEST_UPDATE_SELF: 'request.updateSelf',
  REQUEST_CANCEL_SELF: 'request.cancelSelf',
  REQUEST_VIEW_SELF: 'request.viewSelf',

  REQUEST_VIEW_ALL: 'request.viewAll',
  REQUEST_APPROVE: 'request.approve',
  REQUEST_REJECT: 'request.reject',
  REQUEST_COMMENT: 'request.comment',
  REQUEST_INSERT_MANUAL_ABSENCE: 'request.insertManualAbsence',
  REQUEST_ATTACH_DOCUMENT: 'request.attachDocument',

  REQUEST_OVERRIDE_COVERAGE_RULE: 'request.overrideCoverageRule', // HIGH RISK

  // 10. EXCHANGES
  EXCHANGE_PROPOSE: 'exchange.propose',
  EXCHANGE_ACCEPT: 'exchange.accept',
  EXCHANGE_REJECT: 'exchange.reject',
  EXCHANGE_CANCEL: 'exchange.cancel',
  EXCHANGE_POST_TO_BOARD: 'exchange.postToBoard',
  EXCHANGE_TAKE_FROM_BOARD: 'exchange.takeFromBoard',

  EXCHANGE_VIEW_ALL: 'exchange.viewAll',
  EXCHANGE_APPROVE: 'exchange.approve',
  EXCHANGE_REJECT_BY_MANAGER: 'exchange.rejectByManager',

  // 11. ATTENDANCE
  ATTENDANCE_CHECK_IN_SELF: 'attendance.checkInSelf',
  ATTENDANCE_CHECK_OUT_SELF: 'attendance.checkOutSelf',
  ATTENDANCE_VIEW_SELF: 'attendance.viewSelf',

  ATTENDANCE_VIEW_ALL: 'attendance.viewAll',
  ATTENDANCE_MARK_PRESENT: 'attendance.markPresent',
  ATTENDANCE_MARK_ABSENT: 'attendance.markAbsent',
  ATTENDANCE_MARK_LATE: 'attendance.markLate',

  ATTENDANCE_REQUEST_CORRECTION_SELF: 'attendance.requestCorrectionSelf',
  ATTENDANCE_APPROVE_CORRECTION: 'attendance.approveCorrection',
  ATTENDANCE_EDIT_MANUAL: 'attendance.editManual', // HIGH RISK
  OVERTIME_APPROVE: 'overtime.approve',
  OVERTIME_VIEW: 'overtime.view',

  // 12. REPORTING
  REPORT_VIEW: 'report.view',
  REPORT_EXPORT_CSV: 'report.exportCSV',
  REPORT_EXPORT_XLSX: 'report.exportXLSX',
  REPORT_EXPORT_PDF: 'report.exportPDF',
  PAYROLL_EXPORT: 'payroll.export',
  ANALYTICS_VIEW_COMPANY_KPI: 'analytics.viewCompanyKPI',

  // 13. COMMUNICATION
  ANNOUNCEMENT_CREATE: 'announcement.create',
  ANNOUNCEMENT_UPDATE: 'announcement.update',
  ANNOUNCEMENT_DELETE: 'announcement.delete',
  ANNOUNCEMENT_VIEW: 'announcement.view',

  NOTIFICATION_MANAGE_PREFERENCES_SELF: 'notification.managePreferencesSelf',
  NOTIFICATION_SEND_MANUAL: 'notification.sendManual',
  READ_RECEIPT_CONFIRM_SHIFT_SEEN: 'readReceipt.confirmShiftSeen',
  READ_RECEIPT_VIEW_TEAM: 'readReceipt.viewTeam',

  // 14. INTEGRATIONS
  INTEGRATION_CALENDAR_ENABLE: 'integration.calendar.enable',
  INTEGRATION_CALENDAR_CONFIGURE: 'integration.calendar.configure',
  INTEGRATION_ICS_ISSUE_TOKEN: 'integration.ics.issueToken',
  INTEGRATION_PAYROLL_CONFIGURE_TEMPLATE:
    'integration.payroll.configureTemplate',
  INTEGRATION_WEBHOOK_MANAGE: 'integration.webhook.manage',
  INTEGRATION_API_KEY_MANAGE: 'integration.apiKey.manage',

  // 15. AUDIT / DATA
  AUDIT_VIEW: 'audit.view',
  AUDIT_EXPORT: 'audit.export',
  DATA_EXPORT_COMPANY: 'data.exportCompany',
  DATA_RETENTION_CONFIGURE: 'data.retention.configure',
  GDPR_DELETE_USER: 'gdpr.deleteUser', // HIGH RISK
} as const;

export type PermissionKey = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

// Helper to define Risk Levels for Seed
export const HIGH_RISK_PERMISSIONS = [
  PERMISSIONS.SUPPORT_IMPERSONATE_USER,
  PERMISSIONS.USER_DEACTIVATE,
  PERMISSIONS.USER_DELETE,
  PERMISSIONS.POLICY_OVERRIDE,
  PERMISSIONS.SCHEDULE_UNPUBLISH,
  PERMISSIONS.SCHEDULE_LOCK_PERIOD,
  PERMISSIONS.REQUEST_OVERRIDE_COVERAGE_RULE,
  PERMISSIONS.ATTENDANCE_EDIT_MANUAL,
  PERMISSIONS.GDPR_DELETE_USER,
];

// --- RBAC TYPES & LOGIC ---

export interface RbacAssignment {
  scopeType: string; // 'COMPANY' | 'LOCATION' | 'DEPARTMENT' | 'SELF'
  scopeId: string | null;
  role: {
    key: string;
    permissions: { key: string }[];
  };
}

export interface RbacUser {
  assignments: RbacAssignment[];
  id?: string; // Optional, useful for 'SELF' checks
}

export interface ResourceScope {
  companyId?: string; // Usually implicit if we are checking assignments found via company
  locationId?: string;
  departmentId?: string;
  employeeId?: string; // For SELF checks
}

/**
 * Checks if a user has a specific permission within a given scope.
 */
export function hasPermission(
  user: RbacUser,
  permission: PermissionKey,
  scope: ResourceScope = {}
): boolean {
  // 1. Filter assignments relevant to the requested permission
  // We check if ANY assignment grants this permission.

  const relevantAssignments = user.assignments.filter((a) =>
    a.role.permissions.some((p) => p.key === permission)
  );

  if (relevantAssignments.length === 0) {
    return false;
  }

  // 2. Check Scope Compatibility
  return relevantAssignments.some((assignment) => {
    switch (assignment.scopeType) {
      case 'COMPANY':
        return true; // Global access within company

      case 'LOCATION':
        if (!scope.locationId) return true; // Loose check? Or strict?
        // Let's assume strict: If scope.locationId is provided, it MUST match.
        return assignment.scopeId === scope.locationId;

      case 'DEPARTMENT':
        return assignment.scopeId === scope.departmentId;

      case 'SELF':
        if (!user.id || !scope.employeeId) return false;
        return user.id === scope.employeeId;

      default:
        return false;
    }
  });
}
