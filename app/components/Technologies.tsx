import { technologies } from "../data/Technogy";
import Technology from "./Technology";

export default function Technologies() {
  return (
    <div className="flex flex-wrap space-x-3 space-y-2 justify-center sm:justify-start xl:mx-auto mx-5 my-4 max-w-screen-xl h-fit">
      <div className="font-bold font-stretch-110% text-[20px] sm:text-2xl bg-clip-text text-transparent bg-gradient-to-r to-blue-600 from-violet-800">
        Technologies that I use
      </div>
      {technologies.map((tech) => (
        <Technology key={tech.name} name={tech.name} iconPath={tech.icon} />
      ))}
    </div>
  );
}
