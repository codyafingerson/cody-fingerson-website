import Container from "../components/Container";

export default function IndexPage() {
  return (
    <Container>
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-12 gap-8 p-8">
        {/* Headshot Section */}
        <div className="flex-shrink-0">
          <img
            src="/headshot.jpg"
            alt="Person's Headshot"
            className="relative rounded-full h-48 w-48 md:h-80 md:w-80 shadow-md object-cover before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-black/20 before:-z-10 before:blur-lg"
          />
        </div>

        {/* Description Section */}
        <div className="text-center md:text-left max-w-2xl space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            Hello, I'm Cody!
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            I'm a passionate Computer Science student with a love for
            technology, coding, and software engineering. Currently studying in
            Bozeman, Montana, I have a knack for problem-solving and enjoy
            exploring innovative software solutions. During my time as a
            student, I’ve had the opportunity to intern as a software engineer,
            which further fueled my passion for creating efficient and impactful
            applications. I'm committed to continuous learning and thrive when
            tackling challenges.
          </p>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            As a proud member of the LGBTQ community, I’m dedicated to promoting
            inclusivity within the tech industry, striving to create spaces
            where everyone feels represented.
          </p>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            When I’m not coding, I enjoy spending time with my family, playing
            video games, or hanging out with my friends. I also make it a point
            to learn something new every day, whether it’s related to tech or
            something completely different, embracing growth in all areas of
            life.
          </p>
        </div>
      </div>
    </Container>
  );
}
