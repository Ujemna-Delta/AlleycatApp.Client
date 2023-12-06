import {ReactElement} from "react";
import Sidebar from "../layouts/sidebar";
import {Outlet} from "react-router-dom";

export default function App(): ReactElement {
    return (
        <>
            <Sidebar/>
            <div className="content">
                <Outlet/>
            </div>
        </>
    );
}