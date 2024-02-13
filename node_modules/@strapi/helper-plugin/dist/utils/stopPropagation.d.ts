import * as React from 'react';
/**
 * @deprecated Use the onClick prop on the element you want to stop propagation on instead
 */
export declare const stopPropagation: {
    onClick: (e: React.MouseEvent) => void;
    role: string;
    'aria-hidden': boolean;
};
type OnRowClickProps = {
    fn: (e: React.MouseEvent) => void;
    condition?: boolean;
};
/**
 * @deprecated Set the onClick prop directly
 */
export declare const onRowClick: ({ fn, condition }: OnRowClickProps) => {
    style: {
        cursor: string;
    };
    onClick: (e: React.MouseEvent) => void;
} | undefined;
/**
 *
 * @deprecated Set the onClick prop on the element you want to stop propagation on instead
 */
export declare const StopPropagation: () => React.DetailedReactHTMLElement<{
    onClick: (e: React.MouseEvent) => void;
    role: string;
    'aria-hidden': boolean;
}, HTMLElement>;
export {};
//# sourceMappingURL=stopPropagation.d.ts.map