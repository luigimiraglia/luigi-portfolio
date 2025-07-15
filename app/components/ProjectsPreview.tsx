import { projects } from "../data/projects";
import ProjectPreview from "./ProjectPreview";

export default function ProjectsPreview() {
  return (
    <>
      <h2 className="mx-5 xl:mx-auto font-bold font-stretch-115% text-[20px] sm:text-2xl max-w-screen-xl bg-clip-text text-transparent bg-gradient-to-r to-blue-600 from-violet-800">
        My Projects
      </h2>
      <div className="flex flex-col sm:flex-row max-w-screen-xl xl:mx-auto mx-4 my-4 mt-2 bg-gray-100/50 rounded-2xl sm:overflow-x-auto sm:overflow-y-hidden sm:whitespace-nowrap pr-4">
        {projects.map((el) => (
          <ProjectPreview
            key={el.name}
            name={el.name}
            iconPath={el.iconPath}
            description={el.description}
            stack={el.stack}
            liveUrl={el.liveUrl}
            repoUrl={el.repoUrl}
          />
        ))}
      </div>
    </>
  );
}
