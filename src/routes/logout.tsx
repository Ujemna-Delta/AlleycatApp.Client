import {ReactElement, useEffect} from "react";
import {useAuthStore} from "../store/auth/store.tsx";
import {useNavigate} from "react-router-dom";

export default function LogoutRoute(): ReactElement {
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate("/");
    }, [logout, navigate]);

    return (
        <>Logout...</>
    );
}