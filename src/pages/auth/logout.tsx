import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useStateContext } from "../../context/ContextProvider";

const Logout = () => {
    const { setToken, setUser } = useStateContext();
    useEffect(() => {
        setToken(null);
        setUser(null);
    }, []);
    return <Navigate to="/login" />;
};

export default Logout;