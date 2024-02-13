import { FlexProps } from '@strapi/design-system';
export interface ContentBoxProps {
    title?: string;
    subtitle?: string;
    icon?: FlexProps['children'];
    iconBackground?: FlexProps['background'];
    endAction?: FlexProps['children'];
    titleEllipsis?: boolean;
}
declare const ContentBox: ({ title, subtitle, icon, iconBackground, endAction, titleEllipsis, }: ContentBoxProps) => import("react/jsx-runtime").JSX.Element;
export { ContentBox };
//# sourceMappingURL=ContentBox.d.ts.map