import * as React from 'react';
interface LibraryContextValue {
    fields?: Record<string, React.ComponentType>;
    components?: Record<string, React.ComponentType>;
}
declare const LibraryContext: React.Context<LibraryContextValue>;
interface LibraryProviderProps extends LibraryContextValue {
    children: React.ReactNode;
}
declare const LibraryProvider: ({ children, fields, components }: LibraryProviderProps) => import("react/jsx-runtime").JSX.Element;
declare const useLibrary: () => LibraryContextValue;
export { LibraryContext, LibraryProvider, useLibrary };
export type { LibraryContextValue, LibraryProviderProps };
//# sourceMappingURL=Library.d.ts.map