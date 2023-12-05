import {ReactElement, useState} from "react";
import "./sidebar.css";
import SidebarLink from "./components/sidebar-link";
import Profile from "./components/profile";
import FeatherIcon from "../../components/feather-icon";
import SidebarControl from "./components/sidebar-control";

export default function Sidebar(): ReactElement {
    const [close, setClose] = useState<boolean>(false);

    const toggleClose = () => {
        setClose(!close);
    }

    return (
        <div className={`sidebar ${close ? 'close' : ''}`}>
            <div className="sidebar-content">
                <div className="sidebar-content-group">
                    <Profile name="Vicent Seppel"/>
                    <SidebarLink to="/" text="Home" icon={<FeatherIcon  icon="home"/>}/>
                    <SidebarLink to="/races" text="Races" icon={<FeatherIcon  icon="activity"/>}/>
                    <SidebarLink to="/seasons" text="Seasons" icon={<FeatherIcon  icon="table"/>}/>
                </div>
                <div className="sidebar-content-group">
                    <SidebarLink to="/logout" text="Logout" icon={<FeatherIcon  icon="log-out"/>}/>
                    <SidebarControl close={close} toggle={toggleClose}/>
                </div>
            </div>
        </div>
    );
}