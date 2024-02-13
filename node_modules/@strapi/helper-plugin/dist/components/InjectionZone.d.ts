import * as React from 'react';
export type InjectionZoneProps<TComponent extends React.ComponentType> = {
    area: 'contentManager.listView.actions' | 'contentManager.editView.informations' | 'contentManager.editView.right-links' | `${string}.${string}.${string}`;
} & React.ComponentProps<TComponent>;
export declare const InjectionZone: <TComponent extends React.ComponentType<{}>>({ area, ...props }: InjectionZoneProps<TComponent>) => import("react/jsx-runtime").JSX.Element[] | null;
//# sourceMappingURL=InjectionZone.d.ts.map