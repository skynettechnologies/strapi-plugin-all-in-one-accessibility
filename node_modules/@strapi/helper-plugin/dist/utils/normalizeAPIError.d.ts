import { AxiosError } from 'axios';
import type { ApiError } from '../types';
export interface NormalizeErrorOptions {
    name?: string;
    intlMessagePrefixCallback?: (id: string) => string;
}
interface NormalizeErrorReturn {
    id: string;
    defaultMessage: string;
    name?: string;
    values: Record<'path', string> | Record<string, never>;
}
export declare function normalizeAPIError(apiError: AxiosError<{
    error: ApiError;
}>, intlMessagePrefixCallback?: NormalizeErrorOptions['intlMessagePrefixCallback']): NormalizeErrorReturn | {
    name: string;
    message: string | null;
    errors: NormalizeErrorReturn[];
} | null;
export {};
//# sourceMappingURL=normalizeAPIError.d.ts.map