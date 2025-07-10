import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
} from "react";

// Create the context
interface StepperContextType {
  activeStep: string | number;
  registerStep: (stepId: string | number) => void;
  getStepState: (
    stepId: string | number,
  ) => "completed" | "active" | "inactive";
}

const StepperContext = createContext<StepperContextType | undefined>(undefined);

// Custom hook to use the context
const useStepperContext = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error("useStepperContext must be used within a Parent component");
  }
  return context;
};

interface ParentProps {
  children: ReactNode;
  activeStep: string | number;
}

export const Parent = ({ activeStep, children }: ParentProps) => {
  const [steps, setSteps] = React.useState<(string | number)[]>([]);

  const registerStep = (stepId: number | string) => {
    setSteps((prev) => {
      if (!prev.includes(stepId)) {
        return [...prev, stepId];
      }
      return prev;
    });
  };

  const getStepState = useCallback(
    (stepId: string | number): "active" | "completed" | "inactive" => {
      const currentIndex = steps.indexOf(String(activeStep));
      const stepIndex = steps.indexOf(stepId);
      console.log(currentIndex, stepIndex);
      if (currentIndex === -1 || stepIndex === -1) {
        return "inactive";
      }

      if (stepIndex < currentIndex) return "completed";
      if (stepIndex === currentIndex) return "active";
      return "inactive";
    },
    [activeStep, steps],
  );

  const contextValue = { activeStep, registerStep, getStepState };

  return (
    <StepperContext.Provider value={contextValue}>
      <div>
        <h2>Stepper Parent</h2>
        <h3>Step IDs {steps.join(", ")}</h3>
        <div className="my-4 flex gap-8">{children}</div>
      </div>
    </StepperContext.Provider>
  );
};

interface ChildProps {
  id: string | number;
  children: ReactNode;
}

export const Child = ({ id, children }: ChildProps) => {
  const { registerStep, getStepState } = useStepperContext();

  if (id) {
    registerStep(id);
  }

  const attrs = getDataAttributes({
    state: id ? getStepState(id) : 0,
  });

  return (
    <div
      id={String(id)}
      {...attrs}
      className="data-[state=active]:text-green-400"
    >
      {children}
    </div>
  );
};

function getDataAttributes(
  conditions: Record<string, unknown>,
): Record<string, string> {
  const dataAttributes: Record<string, string> = {};

  Object.entries(conditions).forEach(([key, value]) => {
    if (value !== false && value !== null && value !== undefined) {
      dataAttributes[`data-${key}`] = value === true ? "" : String(value);
    }
  });

  return dataAttributes;
}
