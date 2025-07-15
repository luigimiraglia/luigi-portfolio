import Image from "next/image";
import Button from "./Button";

export default function HeroSection() {
  return (
    <div className="flex flex-col justify-around max-w-screen-xl xl:mx-auto mx-4 my-4 bg-gray-100/50 px-6 py-6 sm:px-8 sm:py-8 sm:space-x-4 rounded-3xl sm:flex-row space-y-5 sm:space-y-0">
      <div className="sm:max-w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="bg-clip-text md:pb-2 text-transparent bg-gradient-to-r to-blue-600 from-violet-800 whitespace-nowrap font-black opacity-90 font-stretch-1250% sm:text-4xl md:text-5xl text-2xl">
            Hi, I&apos;m Luigi!{" "}
          </h1>
          <h2 className="font-semibold sm:text-lg font-stretch-105% md:text-xl opacity-90">
            Building Responsive Web Apps with Next.js & Tailwind CSS
          </h2>
        </div>
        <div className="flex justify-end gap-2 md:gap-3 my-3">
          <Button
            className="bg-gradient-to-tr to-blue-600/90 from-violet-800/90 hover:from-blue-600/90 hover:to-violet-800/90 text-white py-1.5 px-2.5 md:py-2 md:px-4"
            path="./resume"
          >
            View Resume
          </Button>
          <Button
            className="bg-gradient-to-tr from-sky-600/90 to-blue-800/90 hover:from-blue-600/90 hover:to-violet-800/90 text-white py-1.5 px-2.5 md:py-2 md:px-4"
            path="./contact"
          >
            Contact Me
          </Button>
        </div>
      </div>
      <div className="min-w-50">
        <Image
          className="mx-auto"
          alt="avatar"
          src="/avatar.png"
          height={400}
          width={400}
        />
      </div>
    </div>
  );
}
