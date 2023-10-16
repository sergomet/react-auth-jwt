import { Routes, Route, Navigate } from "react-router-dom";
import { Outlet } from 'react-router-dom'

//Guest pages
import Register from "../pages/auth/register";
import Login from "../pages/auth/login";

//Authentication pages
import { Dashboard } from "../pages/dashboard";
import { Layout } from "../pages/layout";
import { useStateContext } from "../context/ContextProvider";
import { useEffect } from "react";
import { NotFound } from "../pages/misc";
import { api } from '../common/api'
import Logout from "../pages/auth/logout";


const GuestLayout = () => {
    return <><Outlet /></>
}

export const MainRouter = () => {
    const ProtectedRoute = ({ children }: { children: any }) => {
        const { token, setUser } = useStateContext();
        useEffect(() => {
            if (token) {
                api.get('/auth/profile').then(({ data }: any) => {
                    setUser(data);
                })
            }
        }, [token, setUser])

        if (!token) {
            return <Navigate to="/login" />;
        }

        return children;
    };

    const GuestOnlyRoute = ({ children }: { children: any }) => {
        const { token } = useStateContext();
        if (token) {
            return <Navigate to="/dashboard" />;
        }
        return children;
    };

    return (
        <Routes>
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="logout" element={<Logout />} />
            </Route>

            <Route element={<GuestOnlyRoute><GuestLayout /></GuestOnlyRoute>}>
                <Route index element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>

    );
};