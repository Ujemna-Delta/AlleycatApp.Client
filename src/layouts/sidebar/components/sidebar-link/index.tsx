import {ReactElement} from "react";
import "./sidebar-link.css";
import {useNavigate} from "react-router-dom";

interface SidebarLinkProps {
    to: string;
    text: string;
    icon: ReactElement;
}

export default function SidebarLink({to, text, icon}: SidebarLinkProps): ReactElement {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    }

    return (
        <div className="sidebar-link" onClick={handleClick}>
            <div className="sidebar-link-icon">{icon}</div>
            <div className="sidebar-link-text">{text}</div>
        </div>
    );
}