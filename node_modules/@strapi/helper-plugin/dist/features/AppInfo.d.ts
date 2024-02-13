import * as React from 'react';
type EmptyObject = Record<string, never>;
type AppInfoContextValue = {
    autoReload?: boolean;
    communityEdition?: boolean;
    currentEnvironment?: string;
    dependencies?: Record<string, string>;
    latestStrapiReleaseTag?: string;
    nodeVersion?: string;
    projectId?: string | null;
    setUserDisplayName: (name: string) => void;
    shouldUpdateStrapi: boolean;
    strapiVersion?: string | null;
    useYarn?: boolean;
    userDisplayName: string;
    userId?: string;
};
declare const AppInfoContext: React.Context<EmptyObject | AppInfoContextValue>;
type AppInfoProviderProps = AppInfoContextValue & {
    children: React.ReactNode;
};
declare const AppInfoProvider: ({ children, autoReload, communityEdition, currentEnvironment, dependencies, latestStrapiReleaseTag, nodeVersion, projectId, setUserDisplayName, shouldUpdateStrapi, strapiVersion, useYarn, userDisplayName, userId, }: AppInfoProviderProps) => import("react/jsx-runtime").JSX.Element;
declare const useAppInfo: () => EmptyObject | AppInfoContextValue;
/**
 * TODO: rename these to remove the plural in next major version
 */
/**
 * @preserve
 * @deprecated use useAppInfo instead
 */
declare const useAppInfos: () => EmptyObject | AppInfoContextValue;
/**
 * @preserve
 * @deprecated use AppInfoProvider instead
 */
declare const AppInfosProvider: ({ children, autoReload, communityEdition, currentEnvironment, dependencies, latestStrapiReleaseTag, nodeVersion, projectId, setUserDisplayName, shouldUpdateStrapi, strapiVersion, useYarn, userDisplayName, userId, }: AppInfoProviderProps) => import("react/jsx-runtime").JSX.Element;
/**
 * @preserve
 * @deprecated use AppInfoContext instead
 */
declare const AppInfosContext: React.Context<EmptyObject | AppInfoContextValue>;
export { AppInfoContext, AppInfoProvider, AppInfosContext, AppInfosProvider, useAppInfo, useAppInfos, };
export type { AppInfoContextValue, AppInfoProviderProps };
//# sourceMappingURL=AppInfo.d.ts.map