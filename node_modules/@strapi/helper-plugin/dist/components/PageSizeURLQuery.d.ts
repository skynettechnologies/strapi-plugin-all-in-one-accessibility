/**
 *
 * PageSizeURLQuery
 *
 */
import { TrackingEvent } from '../features/Tracking';
export interface PageSizeURLQueryProps {
    trackedEvent?: Extract<TrackingEvent, {
        properties?: never;
    }>['name'];
    options?: string[];
    defaultValue?: string;
}
export declare const PageSizeURLQuery: ({ trackedEvent, options, defaultValue, }: PageSizeURLQueryProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=PageSizeURLQuery.d.ts.map