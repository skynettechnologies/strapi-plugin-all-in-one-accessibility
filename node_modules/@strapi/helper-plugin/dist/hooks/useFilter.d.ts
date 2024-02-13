/**
 * Borrowed from @react-aria/i18n
 */
interface Filter {
    startsWith(string: string, substring: string): boolean;
    endsWith(string: string, substring: string): boolean;
    includes(string: string, substring: string): boolean;
}
/**
 * Provides localized string search functionality that is useful for filtering or matching items
 * in a list. Options can be provided to adjust the sensitivity to case, diacritics, and other parameters.
 */
export declare function useFilter(locale: string, options?: Intl.CollatorOptions): Filter;
export {};
//# sourceMappingURL=useFilter.d.ts.map