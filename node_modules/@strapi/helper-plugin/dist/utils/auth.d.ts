interface UserInfo {
    email: string;
    firstname?: string;
    lastname?: string;
    username?: string;
    preferedLanguage?: string;
    id: number;
    isActive?: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
}
interface StorageItems {
    userInfo: UserInfo;
    jwtToken: string;
    STRAPI_THEME: 'light' | 'dark';
    GUIDED_TOUR_CURRENT_STEP: string | null;
    GUIDED_TOUR_COMPLETED_STEPS: string[] | null;
    GUIDED_TOUR_SKIPPED: boolean | null;
    STRAPI_UPDATE_NOTIF: boolean | null;
    STRAPI_UPLOAD_MODAL_VIEW: 0 | 1 | null;
    STRAPI_UPLOAD_LIBRARY_VIEW: 0 | 1 | null;
    videos: unknown;
    onboarding: unknown;
}
type StorageItemValues = StorageItems[keyof StorageItems];
/**
 * @deprecated if you're trying to interact with the token or current user you use should use the `useAuth` hook instead.
 * If you're generally interacting with localStorage, then access this directly e.g. `localStorage.getItem('myKey')`.
 *
 * This will be removed in V5.
 */
declare const auth: {
    clear(key: keyof StorageItems): void | null;
    clearAppStorage(): void;
    get<T extends keyof StorageItems>(key: T): StorageItems[T] | null;
    set(value: StorageItemValues, key: keyof StorageItems, isLocalStorage: boolean): void | null;
    /**
     * @deprecated use auth.clear("jwtToken") instead
     */
    clearToken(tokenKey?: 'jwtToken'): void;
    /**
     * @deprecated use auth.clear("userInfo") instead
     */
    clearUserInfo(userInfoKey?: 'userInfo'): void | null;
    /**
     * @deprecated use auth.get("jwtToken") instead
     */
    getToken(tokenKey?: 'jwtToken'): string | null;
    /**
     * @deprecated use auth.get("userInfo") instead
     */
    getUserInfo(userInfoKey?: 'userInfo'): UserInfo | null;
    /**
     * @depreacted use auth.set(value, "jwtToken", true | false) instead
     */
    setToken(value?: StorageItemValues, isLocalStorage?: boolean, tokenKey?: 'jwtToken'): void;
    /**
     * @depreacted use auth.set(value, "userInfo", true | false) instead
     */
    setUserInfo(value: StorageItemValues, isLocalStorage?: boolean, userInfo?: 'userInfo'): void;
    /**
     * @depreacted use auth.set(value, "userInfo", true | false) instead
     */
    updateToken(value?: StorageItemValues): void;
};
export { auth };
export type { UserInfo, StorageItems };
//# sourceMappingURL=auth.d.ts.map