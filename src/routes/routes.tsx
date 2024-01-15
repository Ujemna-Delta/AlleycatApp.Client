import App from "./app.tsx";
import ErrorPage from "../pages/error-page";
import AboutPage from "../pages/about-page";
import HomeRoute from "./home.tsx";
import ModifyRacePage from "../pages/modify-race-page";
import RacesRoute from "./races.tsx";
import RaceRoute from "./race.tsx";
import LoginRoute from "./login.tsx";
import SeasonsRoute from "./seasons.tsx";
import SeasonRoute from "./season.tsx";
import ModifyLeaguePage from "../pages/modify-league-page";

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
                path: "/seasons/new",
                element: <ModifyLeaguePage/>
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
                path: "/seasons",
                element: <SeasonsRoute/>
            },
            {
                path: "/season/:id",
                element: <SeasonRoute/>
            },
            {
                path: "/about",
                element: <AboutPage/>
            }
        ]
    },
    {
        path: "/login",
        element: <LoginRoute/>
    },
    {
        path: "/logout",
        element: <LogoutRoute/>
    }
];