import {ReactElement, useEffect} from "react";
import LoginPage from "../pages/login-page";
import {useAuthStore} from "../store/auth/store.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";


export default function LoginRoute(): ReactElement {
    const token = useAuthStore((state) => state.token);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const go = searchParams.get("go");

    useEffect(() => {
        if (token !== undefined) {
            navigate(go ? go : "/");
        }
    }, [go, navigate, token])

    return (
        <LoginPage/>
    );
}