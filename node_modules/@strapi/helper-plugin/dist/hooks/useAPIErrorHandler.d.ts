import { AxiosError } from 'axios';
import { IntlFormatters } from 'react-intl';
import { ApiError } from '../types';
import { NormalizeErrorOptions } from '../utils/normalizeAPIError';
interface UnknownApiError {
    name: 'UnknownError';
    message: string;
    details?: unknown;
    status?: number;
}
/**
 * The last item is the fallback error SerializedError which
 * typically comes from redux-toolkit itself.
 */
interface SerializedError {
    name?: string;
    message?: string;
    stack?: string;
    code?: string;
}
/**
 * These are the types or errors we return
 * from the redux-toolkit data-fetching setup.
 */
type BaseQueryError = ApiError | UnknownApiError | SerializedError;
/**
 * Hook that exports an error message formatting function.
 */
export declare function useAPIErrorHandler(intlMessagePrefixCallback?: FormatAPIErrorOptions['intlMessagePrefixCallback']): {
    /**
     * @alpha
     * Convert ValidationErrors from the API into an object that can be used by forms.
     */
    _unstableFormatValidationErrors: (error: Extract<BaseQueryError, {
        name: 'ValidationError';
    }>) => Record<string, string>;
    /**
     * @alpha
     * This handles the errors given from `redux-toolkit`'s axios based baseQuery function.
     */
    _unstableFormatAPIError: (error: BaseQueryError) => string;
    formatAPIError: (error: AxiosError<{
        error: ApiError;
    }, any>) => string;
};
type FormatAPIErrorOptions = Partial<Pick<NormalizeErrorOptions, 'intlMessagePrefixCallback'>> & Pick<IntlFormatters, 'formatMessage'>;
export type { ApiError };
//# sourceMappingURL=useAPIErrorHandler.d.ts.map