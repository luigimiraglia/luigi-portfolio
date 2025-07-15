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
    description:
      "Theoremz is a TypeScript-based web application built with Next.js, designed to deliver an optimized and scalable learning experience in mathematics. It features a component-driven architecture, statically generated content for SEO, and dynamic routing for topic-based navigation. The platform integrates Tailwind CSS for responsive design, supports Markdown-based lesson rendering, and includes a flexible API layer for future expansion into personalized tutoring and analytics.",
    stack: ["Next.js", "Tailwind CSS", "JavaScript", "CSS", "React"],
    liveUrl: "https://theoremz.com",
    repoUrl: "https://github.com/luigimiraglia/theoremz2.0",
  },
  {
    name: "My Portfolio",
    iconPath: "/theoremz-preview.png",
    description:
      "Luigi Miraglia – Developer Portfolio is a fully responsive web application developed with Next.js and TypeScript, showcasing selected projects, technical skills, and professional experiences. The app leverages server-side rendering and static site generation for performance and SEO. Styled with Tailwind CSS, the interface is clean, accessible, and optimized for all devices. The project structure is modular, allowing easy content updates and scalability. Deployment is handled via Vercel, with plans to integrate a headless CMS and GitHub API for real-time project updates.",
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
