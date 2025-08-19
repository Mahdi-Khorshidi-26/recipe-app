import classNames from "classnames";
import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export function Button({ children, className }: ButtonProps) {
  return (
    <button
      className={classNames(
        "flex items-center justify-center px-3 py-2 rounded-md cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
}

export function PrimaryButton({ className, ...props }: ButtonProps) {
  return (
    <Button
      {...props}
      className={classNames(
        "text-white bg-green-500 hover:bg-primary-light",
        className
      )}
    />
  );
}
