import { TrackingEvent } from '../features/Tracking';
export interface SearchURLQueryProps {
    label: string;
    placeholder?: string;
    trackedEvent?: TrackingEvent['name'] | null;
    trackedEventDetails?: TrackingEvent['properties'];
}
declare const SearchURLQuery: ({ label, placeholder, trackedEvent, trackedEventDetails, }: SearchURLQueryProps) => import("react/jsx-runtime").JSX.Element;
export { SearchURLQuery };
//# sourceMappingURL=SearchURLQuery.d.ts.map