// app/page.tsx
import Link from 'next/link';
import { getAllTools } from '@/app/actions/toolActions';
import ToolsList from '@/components/ToolsList';

export default async function HomePage() {
  const res = await getAllTools();
  const tools = 'error' in res ? [] : res;

  return (
    <div className="space-y-16 md:space-y-24 pb-16">
      {/* --- Hero Section --- */}
      <section className="relative flex flex-col items-center text-center space-y-6 pt-8 md:pt-12">
        <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Welcome to my website!
        </h1>
        <p className="max-w-2xl text-lg dark:text-gray-300">
          I'm a developer with a passion for solving real-world problems through code. Explore my projects,
          learn more about my journey from healthcare to tech, and see what I’ve been building.
        </p>
        <Link
          href="/projects"
          className="px-6 py-3 bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-full transition transform hover:scale-105"
        >
          View Projects
        </Link>
      </section>

      {/* --- Tech Stack Section --- */}
      <section className="container mx-auto px-4">
        <h2 id="technologies" className="text-3xl font-bold text-center mb-12 dark:text-white">
          Technologies I Work With
        </h2>

        {/* This will render each category block */}
        <ToolsList tools={tools} />
      </section>
    </div>
  );
}
