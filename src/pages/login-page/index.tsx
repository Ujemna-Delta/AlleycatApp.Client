import React, {FormEvent, ReactElement, useState} from "react";
import "./login-page.css";
import {NavLink} from "react-router-dom";
import {useAuthRequest} from "../../store/auth/store.tsx";
import {IAuthForm} from "../../store/auth/form.tsx";
import LoadingIcon from "../../components/loading-icon";


export default function LoginPage(): ReactElement {
    const status = useAuthRequest((state) => state.status);
    const [formState, setFormState] = useState<IAuthForm>({
        userName: "",
        password: ""
    });

    const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const element = event.target as HTMLInputElement;

        setFormState({
            ...formState,
            [element.name]: element.value
        })
    }

    const handleSubmit = (event: FormEvent) => {
        console.log(formState)
        event.preventDefault();
        useAuthRequest.action(formState);
    }

    return (
        <div className="login-page">
            <div className="login-page-content">
                <div className="login-page-title">
                    Login
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <input type="text" name="userName" placeholder="Login" value={formState.userName}
                           onChange={handleChange} required/>
                    <input type="password" name="password" placeholder="Password"
                           value={formState.password}
                           onChange={handleChange} required/>

                    <button type="submit" name="submit" disabled={status === "loading"}>
                        {status !== "loading" ? (
                            "Sign in"
                        ) : (
                            <LoadingIcon color="white"/>
                        )}
                    </button>

                    {status == "error" && "Error"}

                    <NavLink to="/signup" className="login-change-form">
                        Don't have an account?  Sign Up
                    </NavLink>
                </form>
            </div>
        </div>
    );
}