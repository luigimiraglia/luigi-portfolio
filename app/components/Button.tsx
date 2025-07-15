import Link from "next/link";
import React from "react";

interface ButtonProps {
  path: string;
  children: string;
  className: string;
}

export default function Button({ path, children, className }: ButtonProps) {
  return (
    <Link href={path}>
      <button
        className={`text-[16px] md:text-lg font-stretch-105% font-semibold rounded-xl md:rounded-2xl transition-colors duration-500 ease-in-out ${className} `}
      >
        {children}
      </button>
    </Link>
  );
}
