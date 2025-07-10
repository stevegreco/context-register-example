import "./App.css";
import { Child, Parent } from "./components/Stepper";
import { Child as Child2, Parent as Parent2 } from "./components/Stepper2";
import { useStepState } from "./components/use-step-state";

function App() {
  return (
    <div className="flex flex-col gap-12">
      <Stepper1 />
      <Stepper2 />
      <Stepper3 />
    </div>
  );
}

export default App;

function Stepper1() {
  return (
    <Parent activeStep="2">
      <Child id="1">Step 1</Child>
      <Child id="2">Step 2</Child>
      <Child id="3">Step 3</Child>
    </Parent>
  );
}

function Stepper2() {
  const steps = [
    {
      label: "Step 1",
      state: "active",
    },
    {
      label: "Step 2",
      state: "inactive",
    },
    {
      label: "Step 3",
      state: "inactive",
    },
  ] as const;

  return (
    <Parent2>
      {steps.map((s, i) => {
        return (
          <Child2 id={i} state={s.state}>
            {s.label}
          </Child2>
        );
      })}
    </Parent2>
  );
}

function Stepper3() {
  const { steps, activeStep, incrementStep, decrementStep } = useStepState([
    "Step 1",
    "Step 2",
    "Step 3",
  ]);

  return (
    <div>
      {JSON.stringify(activeStep, null, 2)}
      <Parent2>
        {steps.map((s, i) => {
          return (
            <Child2 id={i} state={s.state}>
              {s.label}
            </Child2>
          );
        })}
      </Parent2>

      <div className="flex gap-4">
        <button onClick={() => decrementStep()}>Decrement</button>
        <button onClick={() => incrementStep()}>Increment</button>
      </div>
    </div>
  );
}
