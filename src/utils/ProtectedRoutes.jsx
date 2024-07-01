import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";  
import AuthContext from "./auth-context";

const ProtectedRoutes = () => {
    const navigate = useNavigate();
    const {isLoggedIn} = useContext(AuthContext);
    useEffect(() => {
        if(isLoggedIn===0) navigate('/', {replace: true}); 
    }, [isLoggedIn, navigate]);

    return (
        (isLoggedIn===-1 ? <div>Loading...</div> : <Outlet/>)
    )
}

export default ProtectedRoutes;