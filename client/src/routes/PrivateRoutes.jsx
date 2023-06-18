import { Outlet, Navigate } from "react-router-dom";

let isAuthenticated = () => {
    const token = localStorage.getItem('accessToken');

    if (token) {
        return true;
    } else {
        return false;
    }
}

export default function PrivateRoutes() {
    return (
        isAuthenticated() ? <Outlet /> : <Navigate replace to='/login' />
    )
}