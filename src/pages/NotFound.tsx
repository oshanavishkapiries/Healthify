import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-300px)]">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg">Page not found</p>
      <Link to="/" className="text-blue-500">
        Go to home
      </Link>
    </div>
  );
};

export default NotFound;
