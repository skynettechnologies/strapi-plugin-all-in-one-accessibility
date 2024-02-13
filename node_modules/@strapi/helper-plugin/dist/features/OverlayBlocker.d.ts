import * as React from 'react';
interface OverlayBlockerContextValue {
    lockApp?: () => void;
    unlockApp?: () => void;
}
declare const OverlayBlockerContext: React.Context<OverlayBlockerContextValue>;
interface OverlayBlockerProviderProps {
    children: React.ReactNode;
}
declare const OverlayBlockerProvider: ({ children }: OverlayBlockerProviderProps) => import("react/jsx-runtime").JSX.Element;
declare const useOverlayBlocker: () => OverlayBlockerContextValue;
export { OverlayBlockerContext, OverlayBlockerProvider, useOverlayBlocker };
//# sourceMappingURL=OverlayBlocker.d.ts.map