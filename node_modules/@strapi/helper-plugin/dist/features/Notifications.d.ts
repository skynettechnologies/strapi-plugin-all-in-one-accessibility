import * as React from 'react';
import { MessageDescriptor } from 'react-intl';
import { TranslationMessage } from '../types';
/**
 * TODO: realistically a lot of this logic is isolated to the `core/admin` package.
 * However, we want to expose the `useNotification` hook to the plugins.
 *
 * Therefore, in V5 we should move this logic back to the `core/admin` package & export
 * the hook from that package and re-export here. For now, let's keep it all together
 * because it's easier to diagnose and we're not using a million refs because we don't
 * understand what's going on.
 */
export interface NotificationLink {
    label: string | MessageDescriptor;
    target?: string;
    url: string;
}
export interface NotificationConfig {
    blockTransition?: boolean;
    link?: NotificationLink;
    message?: string | TranslationMessage;
    onClose?: () => void;
    timeout?: number;
    title?: string | TranslationMessage;
    type?: 'info' | 'warning' | 'softWarning' | 'success';
}
export interface NotificationsContextValue {
    /**
     * Toggles a notification, wrapped in `useCallback` for a stable identity.
     */
    toggleNotification: (config: NotificationConfig) => void;
}
declare const NotificationsContext: React.Context<NotificationsContextValue>;
export interface NotificationsProviderProps {
    children: React.ReactNode;
}
export interface Notification extends NotificationConfig {
    id: number;
}
declare const NotificationsProvider: ({ children }: NotificationsProviderProps) => import("react/jsx-runtime").JSX.Element;
export interface NotificationProps extends Notification {
    clearNotification: (id: number) => void;
}
/**
 * @preserve
 * @description Returns an object to interact with the notification
 * system. The callbacks are wrapped in `useCallback` for a stable
 * identity.
 *
 * @example
 * ```tsx
 * import { useNotification } from '@strapi/helper-plugin';
 *
 * const MyComponent = () => {
 *  const toggleNotification = useNotification();
 *
 *  return <button onClick={() => toggleNotification({ message: 'Hello world!' })}>Click me</button>;
 */
declare const useNotification: () => (config: NotificationConfig) => void;
export { NotificationsContext, NotificationsProvider, useNotification };
//# sourceMappingURL=Notifications.d.ts.map