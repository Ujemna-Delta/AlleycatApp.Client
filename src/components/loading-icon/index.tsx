import {ReactElement} from "react";
import "./loading-icon.css";

interface LoadingIconProps {
    color?: string;
}

export default function LoadingIcon({color = "black"}: LoadingIconProps): ReactElement {
    return (
        <div className="loading-icon-container">
            <div className="loading-icon">
                <div className="loading-icon-inner" style={{borderColor: color}}>

                </div>
            </div>
        </div>
    );
}