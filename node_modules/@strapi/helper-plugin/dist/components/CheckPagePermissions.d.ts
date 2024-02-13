import * as React from 'react';
import { PermissionToCheckAgainst } from '../utils/hasPermissions';
export interface CheckPagePermissionsProps {
    children: React.ReactNode;
    permissions?: PermissionToCheckAgainst[];
}
declare const CheckPagePermissions: ({ permissions, children, }: CheckPagePermissionsProps) => React.JSX.Element;
export { CheckPagePermissions };
//# sourceMappingURL=CheckPagePermissions.d.ts.map