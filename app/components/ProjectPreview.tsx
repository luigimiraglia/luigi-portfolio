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
  const [allVisible, setAllVisible] = useState(false);
  const short = `${description.split(" ").splice(0, 18).join(" ")}...`;

  return (
    <div className="group m-4 mr-0 h-fit sm:min-w-80">
      <div className="relative rounded-2xl p-[1px] transition-transform duration-300 ease-out will-change-transform group-hover:-translate-y-0.5 group-hover:scale-[1.01] bg-gradient-to-r from-violet-400/60 via-blue-400/60 to-violet-400/60">
        <div className="flex h-full flex-col justify-between gap-4 rounded-2xl bg-white p-3">
          <div>
            <Image
              className="w-auto rounded-xl border-2 border-gray-200"
              src={iconPath}
              alt={name}
              width={3000}
              height={1800}
            />
            <p className="mt-2 text-lg font-semibold font-stretch-105%">{name}</p>
            <p className="text-sm text-neutral-700">
              {allVisible ? description : short}
              <button
                className="ml-1 rounded-md bg-gray-100 px-1.5 py-0.5 text-[11px] hover:bg-gray-200"
                onClick={() => setAllVisible((v) => !v)}
                aria-expanded={allVisible}
              >
                {allVisible ? "Hide" : "Expand"}
              </button>
            </p>
          </div>
          <div className="flex justify-center gap-2">
            {liveUrl && (
              <a
                className="rounded-lg bg-gradient-to-r from-violet-700 to-blue-600 px-3 py-1 text-white transition-colors duration-300 ease-in-out hover:from-blue-600 hover:to-violet-700"
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className="font-semibold">Live Site</p>
              </a>
            )}
            {repoUrl && (
              <a
                className="flex items-center gap-1 rounded-lg border-2 px-2.5 py-0.5"
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className="h-6 w-6"
                  src="/github.svg"
                  alt="github logo"
                  height={40}
                  width={40}
                />
                <p className="my-auto h-fit font-semibold">GitHub</p>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
