import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <p className="text-error">
        Sorry, but the age you are looking for is not found.
      </p>

      <Link to="/" className="underline">
        Back to home
      </Link>
    </div>
  );
}
