import { technologies } from "../data/Technogy";
import Technology from "./Technology";
import Reveal from "./Reveal";

export default function Technologies() {
  return (
    <section id="skills">
      <Reveal as="header" className="xl:mx-auto mx-5 max-w-screen-xl">
        <h2 className="font-bold font-stretch-110% text-[20px] sm:text-2xl bg-clip-text text-transparent bg-gradient-to-r to-blue-600 from-violet-800">
          Technologies that I use
        </h2>
      </Reveal>
      <Reveal as="ul" delay={100} className="xl:mx-auto mx-5 my-4 max-w-screen-xl flex flex-wrap justify-center sm:justify-start gap-x-3 gap-y-2">
        {technologies.map((tech, i) => (
          <Reveal as="li" key={tech.name} delay={150 + i * 40}>
            <Technology name={tech.name} iconPath={tech.icon} />
          </Reveal>
        ))}
      </Reveal>
    </section>
  );
}
