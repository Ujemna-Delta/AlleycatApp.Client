import {ReactElement} from "react";
import FeatherIcon from "../../../../components/feather-icon";
import "./../sidebar-link/sidebar-link.css";

interface SidebarControlProps {
    close: boolean;
    toggle: () => void;
}

export default function SidebarControl({close, toggle}: SidebarControlProps): ReactElement {
    return (
        <div className="sidebar-control sidebar-link" onClick={toggle}>
            <div className="sidebar-link-icon">
                {!close ? <FeatherIcon icon="arrow-left"/> : <FeatherIcon icon="arrow-right"/>}
            </div>
        </div>
    );
}