import React from "react";
import Image from "next/image";

interface TechnologyProps {
  name: string;
  iconPath: string;
}

export default function Technology({ name, iconPath }: TechnologyProps) {
  return (
    <div className="flex gap-2 sm:gap-2.5 bg-gray-100/70 p-1 pr-3 sm:pr-4 rounded-full h-fit">
      <Image
        className="p-1 sm:p-1.5 bg-white rounded-full h-7 w-7 sm:h-9 sm:w-9"
        src={iconPath}
        alt={name}
        width={40}
        height={40}
      />
      <p className="text-[13px] sm:text-[16px] font-semibold opacity-95 h-fit my-auto font-stretch-105%">
        {name}
      </p>
    </div>
  );
}
