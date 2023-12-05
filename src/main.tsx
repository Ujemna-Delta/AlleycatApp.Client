import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/app.tsx'
import './styles/index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ErrorPage from "./pages/error-page";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: []
    }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
);
