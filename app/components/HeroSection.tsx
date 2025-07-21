import Image from "next/image";
import Button from "./Button";

export default function HeroSection() {
  return (
    <div className="flex flex-col-reverse justify-around max-w-screen-xl xl:mx-auto mx-4 my-4 bg-gray-100/50 px-6 py-6 sm:px-8 sm:py-8 sm:space-x-4 rounded-3xl sm:flex-row">
      <div className="sm:max-w-1/2 flex flex-col justify-between mt-5">
        <div className="flex flex-col gap-2 md:gap-1">
          <h1 className="bg-clip-text md:pb-2 text-transparent bg-gradient-to-r to-blue-600 from-violet-800 whitespace-nowrap font-black opacity-90 font-stretch-1250% sm:text-4xl md:text-5xl text-3xl">
            Hi, I&apos;m Luigi!{" "}
          </h1>
          <h2 className="font-semibold text-lg font-stretch-105% md:text-xl opacity-90">
            Building Responsive Web Apps with Next.js & Tailwind CSS
          </h2>
        </div>
        <div className="flex justify-center md:justify-end gap-3 md:gap-3 mt-3">
          <Button
            className="bg-gradient-to-tr to-blue-600/90 from-violet-800/90 hover:from-blue-600/90 hover:to-violet-800/90 text-white py-1.5 px-4 md:py-2 md:px-4"
            path="./resume"
          >
            View Resume
          </Button>
          <Button
            className="bg-gradient-to-tr from-sky-600/90 to-blue-800/90 hover:from-blue-600/90 hover:to-violet-800/90 text-white py-1.5 px-4 md:py-2 md:px-4"
            path="./contact"
          >
            Contact Me
          </Button>
        </div>
      </div>
      <div className="relative mx-auto sm:mx-0 sm:w-1/2 overflow-y-hidden max-w-100 -mt-4 sm:-mt-6 lg:-mt-12 sm:-mb-8">
        <Image
          className="object-cover"
          alt="avatar"
          src="/avatar.png"
          height={2250}
          width={2098}
          priority
        />
      </div>
    </div>
  );
}
