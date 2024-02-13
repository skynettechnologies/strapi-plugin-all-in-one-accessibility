/**
 * Pagination
 *
 * The component works as follows
 * `1` , 2, 3, ... 10
 * 1, `2`, 3, ... 10
 * 1, 2, `3`, 4, ... 10
 * 1, 2, 3, `4`, 5, ... 10
 * 1, ..,4, `5`, 6, ... 10
 *
 * 1, ...., 8, 9, `10`
 * 1, ...., 8, `9`, 10
 * 1, ...., 7, `8`, 9, 10
 * 1, ... 6, `7`, 8, 9, 10
 */
type PaginationURLQueryProps = {
    /**
     * Number of always visible pages at the beginning and end.
     * @default 1
     */
    boundaryCount?: number;
    pagination: {
        pageCount: number;
    };
    /**
     * Number of always visible pages before and after the current page.
     * @default 1
     */
    siblingCount?: number;
};
export declare const PaginationURLQuery: ({ pagination: { pageCount }, boundaryCount, siblingCount, }: PaginationURLQueryProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PaginationURLQuery.d.ts.map