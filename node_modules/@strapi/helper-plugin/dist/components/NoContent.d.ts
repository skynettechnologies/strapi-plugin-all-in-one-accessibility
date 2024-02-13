import { EmptyStateLayoutProps } from '@strapi/design-system';
import type { TranslationMessage } from '../types';
export type NoContentProps = Omit<EmptyStateLayoutProps, 'content' | 'icon'> & {
    content?: TranslationMessage;
};
declare const NoContent: ({ content, ...rest }: NoContentProps) => import("react/jsx-runtime").JSX.Element;
export { NoContent };
//# sourceMappingURL=NoContent.d.ts.map