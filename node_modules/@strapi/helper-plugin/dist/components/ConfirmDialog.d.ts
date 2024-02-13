import * as React from 'react';
import { ButtonProps, BoxProps, DialogBodyProps, FlexProps, DialogProps } from '@strapi/design-system';
export interface RootProps extends Partial<FooterProps>, Pick<BoxProps, 'children'> {
    isOpen: boolean;
    title?: {
        id: string;
        defaultMessage: string;
    };
    onToggleDialog: DialogProps['onClose'];
    onConfirm: FooterProps['onConfirm'];
}
export declare const Root: ({ children, iconRightButton, isConfirmButtonLoading, isOpen, onConfirm, onToggleDialog, leftButtonText, rightButtonText, title, variantRightButton, ...props }: RootProps) => import("react/jsx-runtime").JSX.Element;
export interface BodyProps {
    children: FlexProps['children'];
    iconBody?: DialogBodyProps['icon'];
}
export declare const Body: ({ iconBody, children }: BodyProps) => import("react/jsx-runtime").JSX.Element;
interface FooterProps {
    iconRightButton?: ButtonProps['startIcon'];
    isConfirmButtonLoading: boolean;
    onConfirm: ButtonProps['onClick'];
    onToggleDialog: ButtonProps['onClick'];
    leftButtonText: {
        id: string;
        defaultMessage: string;
    };
    rightButtonText: {
        id: string;
        defaultMessage: string;
    };
    variantRightButton: ButtonProps['variant'];
}
export interface ConfirmDialogProps extends Omit<RootProps, 'children'> {
    bodyText?: {
        id: string;
        defaultMessage: string;
    };
}
interface ConfirmDialogComponent extends React.FC<ConfirmDialogProps> {
    Root: React.FC<RootProps>;
    Body: React.FC<BodyProps>;
}
declare const ConfirmDialog: ConfirmDialogComponent;
export { ConfirmDialog };
//# sourceMappingURL=ConfirmDialog.d.ts.map