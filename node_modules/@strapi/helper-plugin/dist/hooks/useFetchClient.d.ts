declare const useFetchClient: () => {
    get: <TData = any, R = import("axios").AxiosResponse<TData, any>, TSend = any>(url: string, config?: import("axios").AxiosRequestConfig<TSend> | undefined) => Promise<R>;
    put: <TData_1 = any, R_1 = import("axios").AxiosResponse<TData_1, any>, TSend_1 = any>(url: string, data?: TSend_1 | undefined, config?: import("axios").AxiosRequestConfig<TSend_1> | undefined) => Promise<R_1>;
    post: <TData_2 = any, R_2 = import("axios").AxiosResponse<TData_2, any>, TSend_2 = any>(url: string, data?: TSend_2 | undefined, config?: import("axios").AxiosRequestConfig<TSend_2> | undefined) => Promise<R_2>;
    del: <TData_3 = any, R_3 = import("axios").AxiosResponse<TData_3, any>, TSend_3 = any>(url: string, config?: import("axios").AxiosRequestConfig<TSend_3> | undefined) => Promise<R_3>;
};
export { useFetchClient };
//# sourceMappingURL=useFetchClient.d.ts.map