import {ReactElement} from "react";
import "./sidebar-link.css";
import {NavLink} from "react-router-dom";

interface SidebarLinkProps {
    to: string;
    text: string;
    icon: ReactElement;
}

export default function SidebarLink({to, text, icon}: SidebarLinkProps): ReactElement {
    return (
        <NavLink className="sidebar-link" to={to}>
            <div className="sidebar-link-icon">{icon}</div>
            <div className="sidebar-link-text">{text}</div>
        </NavLink>
    );
}