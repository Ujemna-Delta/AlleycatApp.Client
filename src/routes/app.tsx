import {ReactElement, useEffect} from "react";
import Sidebar from "../layouts/sidebar";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useAuthStore} from "../store/auth/store.tsx";

export default function App(): ReactElement {
    const token = useAuthStore((state) => state.token);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        if (token === undefined) {
            navigate(`/login?go=${pathname}`);
        }
    }, [navigate, pathname, token])

    return (
        <>
            <Sidebar/>
            <div className="content">
                <Outlet/>
            </div>
        </>
    );
}