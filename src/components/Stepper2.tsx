import { ReactNode } from "react";

// Create the context

interface ParentProps {
  children: ReactNode;
}

export const Parent = ({ children }: ParentProps) => {
  return (
    <div>
      <h2>Stepper Parent</h2>
      <div className="my-4 flex gap-8">{children}</div>
    </div>
  );
};

interface ChildProps {
  id: string | number;
  children: ReactNode;
  state: "complete" | "active" | "inactive";
}

export const Child = ({ id, children, state }: ChildProps) => {
  const attrs = getDataAttributes({
    state,
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
