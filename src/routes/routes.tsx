import App from "./app.tsx";
import ErrorPage from "../pages/error-page";
import AboutPage from "../pages/about-page";
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
            },
            {
                path: "/races",
                element: <RacesRoute/>
            },
            {
                path: "/race/:id",
                element: <RaceRoute/>
            },
            {
                path: "/about",
                element: <AboutPage/>
            },
        ]
    },
    {
        path: "/login",
        element: <LoginRoute/>
    }
];