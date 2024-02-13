/**
 * A custom hook that converts a callback to a ref to avoid triggering re-renders when passed as a
 * prop or avoid re-executing effects when passed as a dependency
 */
export declare const useCallbackRef: <T extends (...args: any[]) => any>(callback: T | undefined) => T;
//# sourceMappingURL=useCallbackRef.d.ts.map