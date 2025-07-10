import { useReducer } from "react";

interface StepsState {
  label: string;
  state: "complete" | "active" | "inactive";
}

interface UseStepStateReturn {
  steps: StepsState[];
  activeStep: StepsState | undefined;
  incrementStep: () => void;
  decrementStep: () => void;
}

type StepAction = { type: "INCREMENT_STEP" } | { type: "DECREMENT_STEP" };

const stepReducer = (state: StepsState[], action: StepAction): StepsState[] => {
  switch (action.type) {
    case "INCREMENT_STEP": {
      const activeIndex = state.findIndex((step) => step.state === "active");
      if (activeIndex === -1 || activeIndex === state.length - 1) {
        return state; // No active step found or already at last step
      }

      return state.map((step, index) => {
        if (index === activeIndex) {
          return { ...step, state: "complete" as const };
        }
        if (index === activeIndex + 1) {
          return { ...step, state: "active" as const };
        }
        return step;
      });
    }

    case "DECREMENT_STEP": {
      const activeIndex = state.findIndex((step) => step.state === "active");
      if (activeIndex === -1 || activeIndex === 0) {
        return state; // No active step found or already at first step
      }

      return state.map((step, index) => {
        if (index === activeIndex) {
          return { ...step, state: "inactive" as const };
        }
        if (index === activeIndex - 1) {
          return { ...step, state: "active" as const };
        }
        return step;
      });
    }

    default:
      return state;
  }
};

export const useStepState = (labels: string[]): UseStepStateReturn => {
  const initialSteps: StepsState[] = labels.map((label, index) => ({
    label,
    state: index === 0 ? "active" : "inactive",
  }));

  const [steps, dispatch] = useReducer(stepReducer, initialSteps);

  const activeStep = steps.find((step) => step.state === "active");

  const incrementStep = () => {
    dispatch({ type: "INCREMENT_STEP" });
  };

  const decrementStep = () => {
    dispatch({ type: "DECREMENT_STEP" });
  };

  return {
    steps,
    activeStep,
    incrementStep,
    decrementStep,
  };
};
