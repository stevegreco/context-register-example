import "./App.css";
import { Child, Parent } from "./components/Stepper";

function App() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Parent activeStep={2}>
        <Child id="1">Step 1 </Child>
        <Child id="2">Step 2 </Child>
        <Child id="3">Step 3 </Child>
      </Parent>
    </div>
  );
}

export default App;
