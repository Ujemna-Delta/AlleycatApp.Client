import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {routes} from "./routes/routes.tsx";
import {initializeIcons} from '@fluentui/react/lib/Icons';

const router = createBrowserRouter(routes);
initializeIcons("https://static2.sharepointonline.com/files/fabric/assets/icons/");

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
);
