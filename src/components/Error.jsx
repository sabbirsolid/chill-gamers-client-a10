import { Helmet } from "react-helmet-async";

const Error = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
            <Helmet>
                <title>404 - Page Not Found</title>
            </Helmet>
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
                <p className="text-gray-600 mb-6">
                    Sorry, the page you are looking for does not exist or has been moved.
                </p>
                <a
                    href="/"
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                    Go to Homepage
                </a>
            </div>
        </div>
    );
};

export default Error;