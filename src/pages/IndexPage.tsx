import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";

import Container from "../components/Container";

export default function IndexPage() {
  return (
    <Container>
      <h1 className="text-xl">Coming soon... </h1>
      <p className="text-md">
        Hello there! My updated portfolio is under development, and will be live
        soon. For now, check out my{" "}
        <a
          className="hover:underline text-blue-500 dark:text-blue-300"
          href="https://github.com/codyafingerson"
          target="_blank"
        >
          <FontAwesomeIcon icon={faGithub} /> GitHub
        </a>{" "}
        (where this project can also be found) or{" "}
        <a
          className="hover:underline text-blue-500 dark:text-blue-300"
          href="https://www.linkedin.com/in/codyfingerson/"
          target="_blank"
        >
          <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
        </a>
        .
      </p>
    </Container>
  );
}
