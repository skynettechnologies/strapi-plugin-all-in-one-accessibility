import { RawTdProps } from '@strapi/design-system';
import { EmptyStateLayoutProps } from './EmptyStateLayout';
export interface EmptyBodyTableProps extends Omit<EmptyStateLayoutProps, 'hasRadius' | 'shadow'>, Pick<RawTdProps, 'colSpan'> {
    isLoading?: boolean;
}
declare const EmptyBodyTable: ({ colSpan, isLoading, ...rest }: EmptyBodyTableProps) => import("react/jsx-runtime").JSX.Element;
export { EmptyBodyTable };
//# sourceMappingURL=EmptyBodyTable.d.ts.map