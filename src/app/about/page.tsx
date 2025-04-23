import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4 py-8" aria-labelledby="about-heading">
      <header className="text-center">
        <h2 id="about-heading" className="text-4xl font-bold mb-6">About Me</h2>
      </header>

      <section className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 space-y-6 md:space-y-0">
        <Image
          src="/headshot.jpg"
          alt="Headshot of Cody A. Fingerson"
          className="w-64 h-64 rounded-full object-cover border-4 border-blue-400 shadow-lg"
          loading="eager"
          width={256}
          height={256}
        />

        <div className="space-y-5 text-justify">
          <p>
            Hi! I’m Cody — a senior Computer Science student at Montana State University, a backend enthusiast,
            and a part-time IT Technician at <strong>AdvicePay</strong>. I love building clean, reliable software that solves real-world problems and improves how people interact with technology.
          </p>
          <p>
            Before diving deep into software, I worked in healthcare as a pharmacy technician and did hands-on
            electromechanical work — experiences that shaped how I approach systems, detail, and people.
            Since then, I’ve built all kinds of things, from internal tools for laser calibration at
            Wavelength Electronics, to my own toy programming language called Cosmo, just for fun (and chaos).
          </p>
          <p>
            I've developed internal calibration tools for QCL lab instruments at <strong>Wavelength Electronics</strong>,
            created a quirky programming language called <strong>Cosmo</strong> in TypeScript, and built tools for non-profits and personal projects.
            I thrive on finding structure in complexity, especially when working with <strong>TypeScript</strong> and <strong>C#</strong>.
          </p>
          <p>
            My technical experience spans Node.js, Spring Boot, React, Vue, Express, WPF, and more — yet what drives me is designing maintainable and efficient systems.
          </p>
          <p>
            Outside of code, you’ll usually find me messing with espresso recipes, snapping photos, or hanging out
            with my partner and our dog. I’m also proud to be part of the LGBTQ+ community and care deeply about
            making tech a more inclusive and welcoming space.
          </p>
          <p>
            Curious about my work or interested in a collaboration?
            <Link href="/contact" className="text-blue-600 dark:text-blue-400 hover:underline ml-1"> Say hi →</Link>
          </p>
        </div>
      </section>
    </div>
  );
}