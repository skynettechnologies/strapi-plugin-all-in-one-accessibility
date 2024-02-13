interface RequestOptions extends RequestInit {
    params?: Record<string, string>;
}
/**
 * Requests a URL, returning a promise
 *
 * @deprecated use `useFetchClient` instead.
 */
export declare function request<ResponseType = unknown>(url: string, options?: RequestOptions, shouldWatchServerRestart?: boolean, stringify?: boolean, { noAuth }?: {
    noAuth?: boolean;
}): Promise<ResponseType>;
export {};
//# sourceMappingURL=request.d.ts.map