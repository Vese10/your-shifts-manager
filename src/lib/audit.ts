import { prisma } from './prisma';

export interface AuditContext {
  companyId: string;
  actorUserId: string;
}

export interface AuditData {
  actionKey: string;
  entityType: string;
  entityId: string;
  reason?: string;
  before?: unknown;
  after?: unknown;
}

/**
 * Calculates a simple diff between two objects.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function diff(obj1: any, obj2: any) {
  // Simple shallow diff or external lib.
  // For now: full objects if small, or key-by-key comparison.
  // Let's store full snapshots for simplicity unless objects are huge.
  return {
    before: obj1,
    after: obj2,
  };
}

/**
 * Logs an action to the AuditLog table.
 */
export async function logAudit(ctx: AuditContext, data: AuditData) {
  try {
    await prisma.auditLog.create({
      data: {
        companyId: ctx.companyId,
        actorUserId: ctx.actorUserId,
        actionKey: data.actionKey,
        entityType: data.entityType,
        entityId: data.entityId,
        metadata: {
          reason: data.reason,
          diff: diff(data.before, data.after),
        },
      },
    });
    console.log(
      `[AUDIT] Logged ${data.actionKey} on ${data.entityType}:${data.entityId} by ${ctx.actorUserId}`
    );
  } catch (error) {
    console.error('[AUDIT] Failed to log audit:', error);
    // Best practice: Does audit failure block action?
    // Usually no, unless strict compliance. We catch and log error.
  }
}
