import { AxiosError } from 'axios';
import type { ApiError } from '../types';
import type { MessageDescriptor } from 'react-intl';
interface GetAPIInnerErrorsOptions {
    getTrad: (id: string) => string;
}
/**
 *
 * Returns a normalized error message
 *
 * @deprecated
 * @preserve
 */
export declare function getAPIInnerErrors(error: AxiosError<{
    error: ApiError;
}>, { getTrad }: GetAPIInnerErrorsOptions): string | Record<string, MessageDescriptor> | undefined;
export {};
//# sourceMappingURL=getAPIInnerErrors.d.ts.map