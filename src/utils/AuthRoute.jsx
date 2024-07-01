import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";  
import AuthContext from "./auth-context";

const AuthRoute = () => {
    const navigate = useNavigate();
    const {isLoggedIn} = useContext(AuthContext);
    useEffect(() => {
        if(isLoggedIn===1) navigate('/patient/home', {replace: true}); 
        else if(isLoggedIn===2) navigate('/doctor/profile', {replace: true}); 
    }, [isLoggedIn, navigate]);

    return (
        (isLoggedIn===-1 ? <div>Loading...</div> : <Outlet/>)
    )
}

export default AuthRoute;