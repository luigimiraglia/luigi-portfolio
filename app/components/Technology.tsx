import Image from "next/image";

interface TechnologyProps {
  name: string;
  iconPath: string;
}

export default function Technology({ name, iconPath }: TechnologyProps) {
  return (
    <span className="inline-flex items-center gap-2 sm:gap-2.5 rounded-full bg-gray-100/70 p-1 pr-3 sm:pr-4">
      <Image
        className="h-7 w-7 rounded-full bg-white p-1 sm:h-9 sm:w-9 sm:p-1.5"
        src={iconPath}
        alt={name}
        width={40}
        height={40}
      />
      <span className="my-auto h-fit text-[13px] font-stretch-105% font-semibold opacity-95 sm:text-[16px]">
        {name}
      </span>
    </span>
  );
}
