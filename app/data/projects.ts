export interface ProjectPreviewProps {
  name: string;
  iconPath: string;
  description: string;
  stack: string[];
  liveUrl?: string;
  repoUrl?: string;
}

export const projects: ProjectPreviewProps[] = [
  {
    name: "Theoremz",
    iconPath: "/theoremz-preview.png",
    description: "Piattaforma educativa con esercizi interattivi di matematica",
    stack: ["Next.js", "Tailwind CSS", "JavaScript", "CSS", "React"],
    liveUrl: "https://theoremz.com",
    repoUrl: "https://github.com/luigimiraglia/theoremz2.0",
  },
  {
    name: "My Portfolio",
    iconPath: "/theoremz-preview.png",
    description: "Sito personale per presentare progetti e bio",
    stack: ["React", "Next.js", "TypeScript", "Vercel"],
    liveUrl: "https://luigi.miraglia.com",
    repoUrl: "https://github.com/luigimiraglia/luigi-portfolio",
  },
  {
    name: "Weather App",
    iconPath: "/theoremz-preview.png",
    description: "App meteo che usa API esterne per previsioni in tempo reale",
    stack: ["React", "OpenWeather API", "Tailwind CSS"],
    liveUrl: "https://weather-app.vercel.app",
    repoUrl: "https://github.com/tuo-username/weather-app",
  },
  {
    name: "ChatGPT Clone",
    iconPath: "/theoremz-preview.png",
    description: "Chatbot UI con chiamate all’API di OpenAI",
    stack: ["Next.js", "OpenAI API", "NextAuth", "MongoDB"],
    liveUrl: "https://chatgpt-clone.vercel.app",
    repoUrl: "https://github.com/tuo-username/chatgpt-clone",
  },
  {
    name: "Blog Engine",
    iconPath: "/theoremz-preview.png",
    description: "Piattaforma di blogging con CMS markdown-based",
    stack: ["Next.js", "MDX", "Vercel", "Tailwind CSS"],
    liveUrl: "https://blog-engine.vercel.app",
    repoUrl: "https://github.com/tuo-username/blog-engine",
  },
];
