import { useLocation } from "react-router-dom";
import Container from "../components/Container";

export default function CatchAll() {
  const location = useLocation();

  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-screen text-center space-y-6">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          Oh no! Page Not Found
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          The page you are looking for does not exist.
        </p>
        <p className="text-md text-gray-500 dark:text-gray-300">
          You tried to access:{" "}
          <a
            className="hover:underline text-blue-600 dark:text-blue-400"
            href={location.pathname}
            target="_blank"
          >
            {location.pathname}
          </a>
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Go Back Home
        </a>
      </div>
    </Container>
  );
}
