import {FormEvent, ReactElement} from "react";
import "./login-page.css";
import {NavLink, useNavigate} from "react-router-dom";

export default function LoginPage(): ReactElement {
    const navigate = useNavigate();

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        navigate("/races");
    }

    return (
        <div className="login-page">
            <div className="login-page-content">
                <div className="login-page-title">
                    Login
                </div>

                <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
                    <input type="text" name="login" placeholder="Login"/>
                    <input type="password" name="password" placeholder="Password"/>
                    <input type="submit" name="submit" value="Login"/>

                    <NavLink to="/signup" className="login-change-form">
                        Or Sign up
                    </NavLink>
                </form>
            </div>
        </div>
    );
}