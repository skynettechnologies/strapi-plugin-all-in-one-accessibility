import { AxiosRequestConfig, AxiosResponse } from 'axios';
type FetchClient = {
    get: <TData = any, R = AxiosResponse<TData>, TSend = any>(url: string, config?: AxiosRequestConfig<TSend>) => Promise<R>;
    put: <TData = any, R = AxiosResponse<TData>, TSend = any>(url: string, data?: TSend, config?: AxiosRequestConfig<TSend>) => Promise<R>;
    post: <TData = any, R = AxiosResponse<TData>, TSend = any>(url: string, data?: TSend, config?: AxiosRequestConfig<TSend>) => Promise<R>;
    del: <TData = any, R = AxiosResponse<TData>, TSend = any>(url: string, config?: AxiosRequestConfig<TSend>) => Promise<R>;
};
declare const getFetchClient: (defaultOptions?: AxiosRequestConfig) => FetchClient;
export { getFetchClient };
//# sourceMappingURL=getFetchClient.d.ts.map