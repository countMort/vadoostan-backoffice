import { ReactNode } from "react";

const variants = {
  default: "bg-code-04 text-black",
  green: "bg-code-01 text-code-1",
  blue: "bg-code-02 text-code-2",
  orange: "bg-code-03 text-code-3",
  pink: "bg-code-05 text-code-5",
} as const;

interface ExpChipProps {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
}

export default function ExpChip({
  children,
  variant = "default",
  className,
}: ExpChipProps) {
  return (
    <div
      className={`text-12 font-bold rounded-5 text-black inline px-[6px] py-[1px] ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
