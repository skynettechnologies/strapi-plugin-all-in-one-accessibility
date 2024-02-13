import * as React from 'react';
import { PermissionToCheckAgainst } from '../utils/hasPermissions';
export interface CheckPermissionsProps {
    children: React.ReactNode;
    permissions?: PermissionToCheckAgainst[];
}
declare const CheckPermissions: ({ permissions, children }: CheckPermissionsProps) => import("react/jsx-runtime").JSX.Element | null;
export { CheckPermissions };
//# sourceMappingURL=CheckPermissions.d.ts.map