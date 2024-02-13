import type { AxiosInstance } from 'axios';
declare const pickedMethods: readonly ["request", "get", "head", "delete", "options", "post", "put", "patch", "getUri"];
type WrappedAxiosInstance = {
    [K in (typeof pickedMethods)[number]]: AxiosInstance[K];
};
/**
 * @deprecated Use the useFetchClient() hook instead, which is exported from the helper-plugin: { useFetchClient } from "@strapi/helper-plugin"
 */
declare function wrapAxiosInstance(instance: AxiosInstance): WrappedAxiosInstance;
export { wrapAxiosInstance };
//# sourceMappingURL=wrapAxiosInstance.d.ts.map