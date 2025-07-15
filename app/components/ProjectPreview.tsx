import React from "react";
import Image from "next/image";
import { ProjectPreviewProps } from "../data/projects";

export default function ProjectPreview({
  name,
  iconPath,
  description,
  liveUrl,
  repoUrl,
}: ProjectPreviewProps) {
  return (
    <div className="flex flex-col bg-white m-4 p-3 mr-0 gap-1 rounded-xl sm:min-w-80">
      <Image
        className="w-auto border-2 border-gray-200 rounded-xl"
        src={iconPath}
        alt="name"
        width={3000}
        height={1800}
      />
      <p className="font-semibold font-stretch-105% text-lg">{name}</p>
      <p className="text-wrap text-sm">{description}</p>
      <div className="flex gap-1">
        <a href={liveUrl} target="_blank">
          Live url
        </a>
        <a href={repoUrl} target="_blank">
          Repo url
        </a>
      </div>
    </div>
  );
}
