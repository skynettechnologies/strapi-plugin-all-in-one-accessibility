import type { Permission } from '../features/RBAC';
import type { GenericAbortSignal } from 'axios';
type PermissionToCheckAgainst = Pick<Permission, 'action' | 'subject'> & Partial<Pick<Permission, 'actionParameters' | 'conditions' | 'properties'>>;
declare const findMatchingPermissions: (userPermissions: Permission[], permissions: PermissionToCheckAgainst[]) => Permission[];
declare const formatPermissionsForRequest: (permissions: Permission[]) => Partial<Permission>[];
/**
 * This should fail if there are no permissions or if there are permissions but no conditions
 */
declare const shouldCheckPermissions: (permissions: Permission[]) => boolean;
declare const hasPermissions: (userPermissions: Permission[], permissions: PermissionToCheckAgainst[], signal?: GenericAbortSignal) => Promise<boolean>;
export { hasPermissions, findMatchingPermissions, formatPermissionsForRequest, shouldCheckPermissions, };
export type { PermissionToCheckAgainst };
//# sourceMappingURL=hasPermissions.d.ts.map