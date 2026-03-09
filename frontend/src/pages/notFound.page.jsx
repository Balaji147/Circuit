import { useNavigate } from "react-router-dom"
import notFound from "../assets/404.jpg"

export const NotFoundPage = () => {

  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

      <div className="max-w-lg w-full text-center">

        {/* Illustration */}
        <img
          src={notFound}
          alt="Page not found"
          className="w-72 sm:w-80 mx-auto mb-8"
        />

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="text-gray-500 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/login")}
          className="px-6 py-3 bg-gray-900 text-white rounded-lg shadow hover:bg-gray-800 transition"
        >
          Go to Login
        </button>

      </div>

    </div>
  )
}
