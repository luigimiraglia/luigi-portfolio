"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ProjectPreviewProps } from "../data/projects";

export default function ProjectPreview({
  name,
  iconPath,
  description,
  liveUrl,
  repoUrl,
}: ProjectPreviewProps) {
  const [allVisible, setAllVIsible] = useState(false);
  return (
    <div className="flex flex-col bg-white m-4 p-3 mr-0 gap-4 rounded-xl sm:min-w-80 justify-between h-fit">
      <div>
        <Image
          className="w-auto border-2 mb-2 border-gray-200 rounded-xl"
          src={iconPath}
          alt="name"
          width={3000}
          height={1800}
        />
        <p className="font-semibold font-stretch-105% text-lg">{name}</p>
        <p className="text-wrap text-sm">
          {allVisible === true
            ? description
            : `${description.split(" ").splice(0, 15).join(" ")}...`}
          <span
            className="text-wrap text-[11px] ml-1 bg-gray-100 rounded-md py-0.5 px-1.5"
            onClick={() => setAllVIsible(!allVisible)}
          >
            {allVisible === true ? "Hide" : "Expand"}
          </span>
        </p>
      </div>
      <div className="flex gap-2 justify-center">
        <a
          className="rounded-lg py-1 px-3 bg-gradient-to-r to-blue-600/90 from-violet-800/90 hover:from-blue-600/90 hover:to-violet-800/90 transition-colors duration-500 ease-in-out text-white"
          href={liveUrl}
          target="_blank"
        >
          <p className="font-semibold">Live Website</p>
        </a>
        <a
          className="flex gap-1 border-2 rounded-lg py-0.5 px-2.5"
          href={repoUrl}
          target="_blank"
        >
          <Image
            className="h-6 w-6"
            src="/github.svg"
            alt="github logo"
            height={40}
            width={40}
          />
          <p className="my-auto h-fit font-semibold">GitHub Repo</p>
        </a>
      </div>
    </div>
  );
}
