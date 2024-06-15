import { useLocation } from "react-router-dom"
import Container from "../components/Container"

export default function CatchAll() {
  const location = useLocation();

  return (
    <Container>
        <h1 className="text-xl">Oh no!</h1>
        <p className="text-md">The page you are looking for does not exist. <a className="hover:underline text-blue-500" href={location.pathname} target="_blank">{location.pathname}</a></p>
    </Container>
  )
}