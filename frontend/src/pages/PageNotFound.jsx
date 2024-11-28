import { Link } from 'react-router-dom'
import { FaExclamationTriangle } from 'react-icons/fa'

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <div className="text-center">
        <FaExclamationTriangle className="text-6xl text-red-500 mb-4" />
        <h1 className="text-8xl font-bold mb-2">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Oops! Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
            It seems like the page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link to="/" className="inline-block px-6 py-3 rounded-lg shadow transition product-btn">
            Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound
