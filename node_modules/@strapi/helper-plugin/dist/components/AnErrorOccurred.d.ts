import { EmptyStateLayoutProps } from '@strapi/design-system';
import type { TranslationMessage } from '../types';
export type AnErrorOccurredProps = Omit<EmptyStateLayoutProps, 'content' | 'icon'> & {
    content?: TranslationMessage;
};
declare const AnErrorOccurred: ({ content, ...rest }: AnErrorOccurredProps) => import("react/jsx-runtime").JSX.Element;
export { AnErrorOccurred };
//# sourceMappingURL=AnErrorOccurred.d.ts.map