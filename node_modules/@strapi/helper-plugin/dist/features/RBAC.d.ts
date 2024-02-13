import * as React from 'react';
import type { Entity } from '@strapi/types';
/**
 * This is duplicated from the `@strapi/admin` package.
 */
interface Permission {
    id?: Entity.ID;
    action: string;
    actionParameters?: object;
    subject?: string | null;
    properties?: {
        fields?: string[];
        locales?: string[];
        [key: string]: any;
    };
    conditions?: string[];
}
export type RBACContextValue = {
    allPermissions: Permission[];
    refetchPermissions: () => void;
};
declare const RBACContext: React.Context<RBACContextValue>;
/**
 * @deprecated Use RBACContext instead.
 */
declare const RBACProviderContext: React.Context<RBACContextValue>;
declare const useRBACProvider: () => RBACContextValue;
export { RBACContext, RBACProviderContext, useRBACProvider, Permission };
//# sourceMappingURL=RBAC.d.ts.map