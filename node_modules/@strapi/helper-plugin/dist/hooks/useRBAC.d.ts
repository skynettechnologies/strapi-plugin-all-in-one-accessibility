import { Permission } from '../features/RBAC';
export type AllowedActions = Record<string, boolean>;
export declare const useRBAC: (permissionsToCheck?: Record<string, Permission[]>, passedPermissions?: Permission[]) => {
    allowedActions: AllowedActions;
    isLoading: boolean;
    setIsLoading: () => void;
};
//# sourceMappingURL=useRBAC.d.ts.map