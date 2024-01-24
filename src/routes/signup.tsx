import {ReactElement, useEffect} from "react";
import SignupPage from "../pages/signup-page";
import {useAuthStore} from "../store/auth/store.tsx";
import {useNavigate, useSearchParams} from "react-router-dom";


export default function SignupRoute(): ReactElement {
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
        <SignupPage/>
    );
}