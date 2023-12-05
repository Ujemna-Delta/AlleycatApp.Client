import App from "./app.tsx";
import ErrorPage from "../pages/error-page";

export const routes = [
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: []
    }
];