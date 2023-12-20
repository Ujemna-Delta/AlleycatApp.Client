import App from "./app.tsx";
import ErrorPage from "../pages/error-page";
import AboutPage from "../pages/about-page";
import HomeRoute from "./home.tsx";
import ModifyRacePage from "../pages/modify-race-page";

export const routes = [
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <HomeRoute/>
            },
            {
                path: "/races/new",
                element: <ModifyRacePage/>
            },
            {
                path: "/about",
                element: <AboutPage/>
            }
        ]
    }
];