import {ReactElement} from "react";
import Sidebar from "../layouts/sidebar";
import {Outlet} from "react-router-dom";

export default function App(): ReactElement {
    return (
        <>
            <Sidebar/>
            <div className="content">
                Icons:
                <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik -
                    Flaticon</a>

                <br/>
                Feather Icons on MIT license from https://github.com/feathericons/feather
                <Outlet/>
            </div>
        </>
    );
}