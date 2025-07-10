import React from "react";

export const Button = ({
  children = "Button",
  onClick,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
}) => {
  return <button onClick={onClick}>{children}</button>;
};

export default Button;
