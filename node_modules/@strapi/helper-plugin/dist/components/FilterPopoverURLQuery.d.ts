import { PopoverProps } from '@strapi/design-system';
import type { FilterData } from '../types';
export interface FilterPopoverURLQueryProps extends Pick<PopoverProps, 'source'> {
    displayedFilters: FilterData[];
    isVisible: boolean;
    onBlur?: () => void;
    onToggle: () => void;
}
export declare const FilterPopoverURLQuery: ({ displayedFilters, isVisible, onBlur, onToggle, source, }: FilterPopoverURLQueryProps) => import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=FilterPopoverURLQuery.d.ts.map