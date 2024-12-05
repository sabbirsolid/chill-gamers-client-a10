import { Helmet } from "react-helmet-async";


const Error = () => {
    return (
        <div className="min-h-screen mx-auto">
            <Helmet>
          <title>Error</title>
        </Helmet>
            <h1>404</h1>
            <h1>Page Not Found</h1>
        </div>
    );
};

export default Error;