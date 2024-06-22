import { Duration } from 'date-fns';
interface CustomInterval {
    unit: keyof Duration;
    text: string;
    threshold: number;
}
export interface RelativeTimeProps {
    timestamp: Date;
    customIntervals?: CustomInterval[];
    className?: string;
}
/**
 * Displays the relative time between a given timestamp and the current time.
 * You can display a custom message for given time intervals by passing an array of custom intervals.
 *
 * @example
 * ```jsx
 * <caption>Display "last hour" if the timestamp is less than an hour ago</caption>
 * <RelativeTime
 *  timestamp={new Date('2021-01-01')}
 *  customIntervals={[
 *   { unit: 'hours', threshold: 1, text: 'last hour' },
 *  ]}
 * ```
 */
declare const RelativeTime: ({ timestamp, customIntervals, className }: RelativeTimeProps) => import("react/jsx-runtime").JSX.Element;
export { RelativeTime };
//# sourceMappingURL=RelativeTime.d.ts.map