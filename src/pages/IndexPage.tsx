import Container from "../components/Container";

export default function IndexPage() {
  return (
    <Container>
      <div className="flex flex-col md:flex-row items-center justify-center md:gap-12 gap-8 p-8">
        {/* Headshot Section */}
        <div className="flex-shrink-0">
          <img
            src="/headshot.jpg"
            alt="Headshot of Cody"
            className="relative rounded-full h-48 w-48 md:h-80 md:w-80 shadow-md object-cover before:content-[''] before:absolute before:inset-0 before:rounded-full before:bg-black/20 before:-z-10 before:blur-lg"
          />
        </div>

        {/* Description Section */}
        <div className="text-center md:text-left max-w-2xl space-y-6">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100">
            Hello, I'm Cody!
          </h1>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Driven by a passion for technology and a commitment to creating
            impactful solutions, I'm a Computer Science student with a unique
            blend of technical and interpersonal skills. My journey has taken me
            from hands-on electromechanical work and pharmacy technology to
            software engineering and IT, providing me with a diverse perspective
            and a robust problem-solving toolkit.
          </p>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            My experiences at Wavelength Electronics, Inc., allowed me to develop
            and implement software solutions for complex calibration processes,
            while my IT roles at AdvicePay have honed my skills in system
            administration, automation, and technical support. I'm proficient in
            scripting with Bash, managing MDM systems, and ensuring seamless
            technology experiences for teams. My background in pharmacy
            technology has also instilled in me a strong sense of attention to
            detail and a commitment to compliance, particularly regarding
            sensitive data.
          </p>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Currently pursuing my Computer Science degree in Bozeman, Montana,
            I'm dedicated to continuous learning and exploring innovative
            software solutions. I thrive in collaborative environments and am
            passionate about optimizing workflows and improving team efficiency.
          </p>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            As a member of the LGBTQ+ community, I'm committed to fostering
            inclusivity within the tech industry, striving to create spaces
            where everyone feels represented and valued.
          </p>
          <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Outside of coding, I enjoy photography, experimenting with
            espresso, and spending quality time with friends, my partner, and my
            dog. I believe in embracing growth in all areas of life and am
            always eager to learn something new.
          </p>
        </div>
      </div>
    </Container>
  );
}