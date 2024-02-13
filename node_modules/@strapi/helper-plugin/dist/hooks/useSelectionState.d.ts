/// <reference types="react" />
export declare const useSelectionState: <TValues extends object>(keys: (keyof TValues)[], initialValue: TValues[]) => readonly [TValues[], {
    readonly selectOne: (selection: TValues) => void;
    readonly selectAll: (nextSelections: TValues[]) => void;
    readonly selectOnly: (nextSelection: TValues) => void;
    readonly selectMultiple: (nextSelections: TValues[]) => void;
    readonly deselectMultiple: (nextSelections: TValues[]) => void;
    readonly setSelections: import("react").Dispatch<import("react").SetStateAction<TValues[]>>;
}];
//# sourceMappingURL=useSelectionState.d.ts.map