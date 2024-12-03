import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import Navbar from "../components/Navbar";
import { Navigate} from "react-router-dom";
import Footer from "../components/Footer";


const PrivateRoute = ({children}) => {
    const {user} = useContext(AuthContext);
    if(user?.email){
        return (
            <div>
                <Navbar></Navbar>
                {children}
                <Footer></Footer>
            </div>
        )
    }
    else{
        return <Navigate to="/login"></Navigate>
    }
};
export default PrivateRoute;