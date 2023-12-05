import {ReactElement} from "react";
import {isRouteErrorResponse, useNavigate, useRouteError} from "react-router-dom";
import {PrimaryButton} from "@fluentui/react";
import "./error-page.css";

export default function ErrorPage(): ReactElement {
    const error = useRouteError();
    const navigate = useNavigate();
    let message = undefined;

    if (isRouteErrorResponse(error)) {
        message = `${error.status} = ${error.statusText || error.data}`;
    } else if (error !== undefined && error !== null) {
        message = error.toString();
    }

    if (message !== undefined) {
        return (
            <div className="error-page">
                <h1>Oops!</h1>
                <p>Sorry, an unexpected error has occurred.</p>
                <p className="error-code">
                    <i>{message}</i>
                </p>
                <p>
                    <PrimaryButton text="Home" onClick={() => navigate("/")}/>
                </p>
            </div>
        );
    }

    return (
        <div className="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <PrimaryButton text="Home" onClick={() => navigate("/")}/>
            </p>
        </div>
    );
}