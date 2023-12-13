import {ReactElement} from "react";
import "./profile.css";

interface ProfileProps {
    name: string;
}

export default function Profile({ name }: ProfileProps): ReactElement {
    return (
        <div className="sidebar-profile">
            <img src="/profile.png" className="sidebar-profile-icon" alt="profile icon"/>

            <div className="sidebar-profile-name">
                {name}
            </div>
        </div>
    );
}