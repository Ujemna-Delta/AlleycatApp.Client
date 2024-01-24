import React, {FormEvent, ReactElement, useState} from "react";
import "./signup-page.css";
import {useAuthRequest} from "../../store/auth/store.tsx";
import {IAuthForm} from "../../store/auth/form.tsx";
import LoadingIcon from "../../components/loading-icon";
import {addUser} from "../../api/users.ts";


export default function SignupPage(): ReactElement {
    const status = useAuthRequest((state) => state.status);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [userForm, setUserForm] = useState({
        userName: "",
        password: "",
        firstName: "",
        lastName: "",
        nickname: "",
        marks: ""
    });
    const handleChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target as HTMLInputElement;
        if (name === "confirmPassword") {
            setConfirmPassword(value);
            setPasswordsMatch(userForm.password === value);
        } else {
            setUserForm({...userForm, [name]: value});
            if (name === "password") {
                setPasswordsMatch(value === confirmPassword);
            }

        }
    }

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!passwordsMatch) {
            return;
        }
        await addUser(userForm);

        console.log("już po")

        const authForm: IAuthForm = {
            userName: userForm.userName,
            password: userForm.password
        };
        useAuthRequest.action(authForm);

    }

    const allFieldsFilled = () => {
        return (
            userForm.userName.trim() !== "" &&
            userForm.password.trim() !== "" &&
            confirmPassword.trim() !== "" &&
            userForm.firstName.trim() !== "" &&
            userForm.lastName.trim() !== "" &&
            userForm.nickname.trim() !== ""
        );
    };

    return (
        <div className="signup-page">
            <div className="signup-page-content">
                <div className="signup-page-title">
                    signup
                </div>

                <form className="signup-form" onSubmit={handleSubmit}>
                    <input type="text" name="userName" placeholder="userName" value={userForm.userName}
                           onChange={handleChange} required/>
                    <input type="password" name="password" placeholder="Password"
                           value={userForm.password}
                           onChange={handleChange} required/>
                    <input type="password" name="confirmPassword" placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={handleChange} required/>
                    <input type="text" name="firstName" placeholder="First Name"
                           value={userForm.firstName}
                           onChange={handleChange} required/>
                    <input type="text" name="lastName" placeholder="Last Name"
                           value={userForm.lastName}
                           onChange={handleChange} required/>
                    <input type="text" name="nickname" placeholder="Nickname"
                           value={userForm.nickname}
                           onChange={handleChange} required/>
                    <input type="text" name="marks" placeholder="Marks"
                           value={userForm.marks}
                           onChange={handleChange} required/>

                    <button
                        type="submit"
                        disabled={status === "loading" || !passwordsMatch || !allFieldsFilled()}
                        style={{
                            backgroundColor: (status === "loading" || !passwordsMatch || !allFieldsFilled()) ? 'gray' : 'black',
                            color: 'white'
                        }}
                    >
                        {status !== "loading" ? "Signup" : <LoadingIcon/>}
                    </button>

                    {status == "error" && "Error"}

                    {!passwordsMatch && (
                        <div style={{display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
                            <div style={{color: 'red'}}>
                            Passwords do not match.
                            </div>
                        </div>
                    )}

                </form>
            </div>
        </div>
    );
}