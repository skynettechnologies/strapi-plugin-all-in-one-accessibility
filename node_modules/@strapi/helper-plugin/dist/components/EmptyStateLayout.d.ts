/// <reference types="react" />
import { EmptyStateLayoutProps as LayoutProps } from '@strapi/design-system';
import type { TranslationMessage } from '../types';
declare const icons: {
    document: (props: import("react").SVGProps<SVGSVGElement>) => import("react/jsx-runtime").JSX.Element;
    media: (props: import("react").SVGProps<SVGSVGElement>) => import("react/jsx-runtime").JSX.Element;
    permissions: (props: import("react").SVGProps<SVGSVGElement>) => import("react/jsx-runtime").JSX.Element;
};
export interface EmptyStateLayoutProps extends Pick<LayoutProps, 'action' | 'hasRadius' | 'shadow'> {
    icon?: keyof typeof icons;
    content?: TranslationMessage;
}
declare const EmptyStateLayout: ({ action, content, hasRadius, icon, shadow, }: EmptyStateLayoutProps) => import("react/jsx-runtime").JSX.Element;
export { EmptyStateLayout };
//# sourceMappingURL=EmptyStateLayout.d.ts.map