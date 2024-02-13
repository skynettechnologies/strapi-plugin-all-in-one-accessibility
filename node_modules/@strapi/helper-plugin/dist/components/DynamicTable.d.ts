import * as React from 'react';
import { BaseCheckboxProps, TableProps as DSTableProps } from '@strapi/design-system';
import { Entity } from '@strapi/types';
import { EmptyBodyTableProps } from './EmptyBodyTable';
interface TableProps<TRows extends {
    id: Entity.ID;
} = {
    id: Entity.ID;
}, THeader extends TableHeader = TableHeader> extends Pick<EmptyBodyTableProps, 'action'>, Pick<DSTableProps, 'footer'> {
    children?: React.ReactNode;
    contentType: string;
    components?: {
        ConfirmDialogDeleteAll?: React.ElementType;
        ConfirmDialogDelete?: React.ElementType;
    };
    headers?: TableHeadProps<THeader>['headers'];
    isLoading?: boolean;
    onConfirmDeleteAll?: (ids: Array<TRows['id']>) => Promise<void>;
    onConfirmDelete?: (id: TRows['id']) => Promise<void>;
    rows?: Array<TRows>;
    withBulkActions?: boolean;
    withMainAction?: boolean;
    renderBulkActionsBar?: (props: {
        selectedEntries: Array<string | number>;
        clearSelectedEntries: () => void;
    }) => React.ReactNode;
}
interface TableRowProps<TRows extends {
    id: Entity.ID;
} = {
    id: Entity.ID;
}, THeader extends TableHeader = TableHeader> extends Pick<TableProps<TRows, THeader>, 'withBulkActions' | 'withMainAction' | 'rows' | 'headers'>, Pick<TableHeadProps<THeader>, 'entriesToDelete'> {
    onClickDelete: (id: TRows['id']) => void;
    onSelectRow: (row: {
        name: TRows['id'];
        value: boolean;
    }) => void;
}
/**
 * @deprecated
 * This component will be replaced by packages/core/helper-plugin/src/components/Table
 * in the next major release.
 */
declare const Table: ({ action, children, contentType, components, footer, headers, isLoading, onConfirmDeleteAll, onConfirmDelete, rows, withBulkActions, withMainAction, renderBulkActionsBar, ...rest }: TableProps) => import("react/jsx-runtime").JSX.Element;
interface TableHeader {
    fieldSchema?: {
        type: string;
    };
    name: string;
    metadatas: {
        sortable: boolean;
        label: string;
        mainField?: {
            name: string;
        };
    };
}
interface TableHeadProps<THeader extends TableHeader = TableHeader> {
    areAllEntriesSelected?: boolean;
    entriesToDelete?: Array<string | number>;
    headers?: Array<THeader>;
    onSelectAll: BaseCheckboxProps['onChange'];
    withMainAction?: boolean;
    withBulkActions?: boolean;
}
export { Table as DynamicTable };
export type { TableProps, TableRowProps, TableHeader, TableHeadProps };
//# sourceMappingURL=DynamicTable.d.ts.map