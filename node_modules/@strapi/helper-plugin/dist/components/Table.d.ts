import * as React from 'react';
import { TableProps as DSTableProps } from '@strapi/design-system';
import { EmptyStateLayoutProps } from './EmptyStateLayout';
import type { Attribute, Entity } from '@strapi/types';
interface TableContextValue<TRow extends {
    id: Entity.ID;
} = {
    id: Entity.ID;
}> {
    selectedEntries: Entity.ID[];
    setSelectedEntries: React.Dispatch<React.SetStateAction<Entity.ID[]>>;
    onSelectRow: (args: {
        name: Entity.ID;
        value: boolean;
    }) => void;
    rows: TRow[];
    isLoading: boolean;
    isFetching: boolean;
    colCount: number;
    rowCount: number;
}
declare const useTableContext: <TRow extends {
    id: Entity.ID;
}>() => TableContextValue<TRow>;
interface ActionBarProps {
    children: React.ReactNode;
}
interface BulkDeleteButtonProps {
    onConfirmDeleteAll: (ids: Entity.ID[]) => Promise<void>;
}
interface HeadProps {
    children: React.ReactNode;
}
interface HeaderCellProps {
    fieldSchemaType: Attribute.Kind | 'custom';
    name: string;
    relationFieldName?: string;
    isSortable?: boolean;
    label: string;
}
interface RootProps extends Partial<Pick<TableContextValue, 'colCount' | 'rows' | 'isLoading' | 'isFetching'>> {
    children: React.ReactNode;
    defaultSelectedEntries?: Entity.ID[];
}
interface EmptyBodyProps extends EmptyStateLayoutProps {
    contentType: string;
}
interface BodyProps {
    children: React.ReactNode;
}
interface ContentProps extends Pick<DSTableProps, 'footer'> {
    children: React.ReactNode;
}
declare const Table: {
    Content: ({ children, footer }: ContentProps) => import("react/jsx-runtime").JSX.Element;
    Root: ({ children, defaultSelectedEntries, rows, colCount, isLoading, isFetching, }: RootProps) => import("react/jsx-runtime").JSX.Element;
    Body: ({ children }: BodyProps) => import("react/jsx-runtime").JSX.Element | null;
    ActionBar: ({ children }: ActionBarProps) => import("react/jsx-runtime").JSX.Element | null;
    Head: ({ children }: HeadProps) => import("react/jsx-runtime").JSX.Element;
    HeaderCell: ({ fieldSchemaType, name, relationFieldName, isSortable, label, }: HeaderCellProps) => import("react/jsx-runtime").JSX.Element;
    HeaderHiddenActionsCell: () => import("react/jsx-runtime").JSX.Element;
    HeaderCheckboxCell: () => import("react/jsx-runtime").JSX.Element | null;
    LoadingBody: () => import("react/jsx-runtime").JSX.Element | null;
    EmptyBody: ({ contentType, ...rest }: EmptyBodyProps) => import("react/jsx-runtime").JSX.Element | null;
    BulkDeleteButton: ({ onConfirmDeleteAll }: BulkDeleteButtonProps) => import("react/jsx-runtime").JSX.Element;
};
export { Table, useTableContext };
//# sourceMappingURL=Table.d.ts.map