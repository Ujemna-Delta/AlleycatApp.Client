import {ReactElement} from "react";
import "./sidebar.css";
import SidebarLink from "./components/sidebar-link";
import Profile from "./components/profile";
import FeatherIcon from "../../components/feather-icon";

export default function Sidebar(): ReactElement {
    return (
        <div className="sidebar">
            <div className="sidebar-content">
                <div className="sidebar-content-group">
                    <Profile name="VeloVirtuoso"/>
                    <SidebarLink to="/" text="Home" icon={<FeatherIcon icon="home"/>}/>
                    <SidebarLink to="/races" text="Races" icon={<FeatherIcon icon="calendar"/>}/>
                    <SidebarLink to="/seasons" text="Seasons" icon={<FeatherIcon icon="bar-chart-2"/>}/>
                </div>
                <div className="sidebar-content-group">
                    <SidebarLink to="/about" text="About" icon={<FeatherIcon icon="info"/>}/>
                    <SidebarLink to="/logout" text="Logout" icon={<FeatherIcon icon="log-out"/>}/>
                </div>
            </div>
        </div>
    );
}