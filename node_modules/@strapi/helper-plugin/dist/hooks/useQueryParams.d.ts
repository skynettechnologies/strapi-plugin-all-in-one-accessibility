declare const useQueryParams: <TQuery extends object>(initialParams?: TQuery | undefined) => readonly [{
    readonly query: TQuery;
    readonly rawQuery: string;
}, (nextParams: TQuery, method?: 'push' | 'remove') => void];
export { useQueryParams };
//# sourceMappingURL=useQueryParams.d.ts.map