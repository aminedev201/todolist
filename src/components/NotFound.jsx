import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-9xl font-extrabold text-gray-300 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8 text-center">
        Oops! The Page You Are Looking For Doesn’t Exist.
      </p>
      <Link
        to="/my-tasks"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
      >
        Go To Home
      </Link>
    </div>
  );
}
