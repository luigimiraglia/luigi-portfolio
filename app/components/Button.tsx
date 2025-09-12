import Link from "next/link";
import { ReactNode } from "react";

interface ButtonProps {
  path: string;
  children: ReactNode;
  className?: string;
}

export default function Button({ path, children, className = "" }: ButtonProps) {
  return (
    <Link
      href={path}
      className={`inline-flex select-none items-center justify-center text-[16px] md:text-lg font-stretch-105% font-semibold rounded-xl md:rounded-2xl transition-all duration-300 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 active:scale-[0.98] ${className}`}
    >
      {children}
    </Link>
  );
}
