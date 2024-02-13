import * as React from 'react';
/**
 * TODO: whats the value in having this in the `helper-plugin`? is it actually
 * used externally. I doubt it.
 */
type SectionKey = keyof GuidedTourContextValue['guidedTourState'];
type StepKey = keyof GuidedTourContextValue['guidedTourState'][SectionKey];
type Step = `${SectionKey}.${StepKey}`;
interface GuidedTourContextValue {
    currentStep: Step | null;
    guidedTourState: {
        contentTypeBuilder: {
            create: boolean;
            success: boolean;
        };
        contentManager: {
            create: boolean;
            success: boolean;
        };
        apiTokens: {
            create: boolean;
            success: boolean;
        };
        transferTokens: {
            create: boolean;
            success: boolean;
        };
    };
    isGuidedTourVisible: boolean;
    isSkipped: boolean;
    setCurrentStep: (step: Step | null) => void | null;
    setGuidedTourVisibility: (isVisible: boolean) => void;
    setSkipped: (isSkipped: boolean) => void;
    setStepState: (step: Step, state: boolean) => void;
    startSection: (section: SectionKey) => void;
}
declare const GuidedTourContext: React.Context<GuidedTourContextValue>;
interface GuidedTourProviderProps extends GuidedTourContextValue {
    children: React.ReactNode;
}
declare const GuidedTourProvider: ({ children, currentStep, guidedTourState, isGuidedTourVisible, isSkipped, setCurrentStep, setGuidedTourVisibility, setSkipped, setStepState, startSection, }: GuidedTourProviderProps) => import("react/jsx-runtime").JSX.Element;
declare const useGuidedTour: () => GuidedTourContextValue;
type GuidedTourStep = Step;
type GuidedTourSectionKey = SectionKey;
type GuidedTourStepKey = StepKey;
export { GuidedTourContext, GuidedTourProvider, useGuidedTour };
export type { GuidedTourContextValue, GuidedTourStep, GuidedTourSectionKey, GuidedTourStepKey };
//# sourceMappingURL=GuidedTour.d.ts.map