import App from "./app.tsx";
import ErrorPage from "../pages/error-page";
import HomeRoute from "./home.tsx";

export const routes = [
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <HomeRoute/>
            }
        ]
    }
];