import {ReactElement} from "react";
import icons from "./icons.json";
import "./feather-icon.css";

interface FeatherIconProps {
    icon: string,
    className?: string,
    color?: string,

}

export default function FeatherIcon({
                                        icon,
                                        className = "",
                                        color = "currentColor"
                                    }: FeatherIconProps): ReactElement {
    if (!icon || !(icon in icons)) {
        icon = "alert-circle";
        color = "#ED5565";
    }

    const iconMarkup = icons[icon as keyof typeof icons];

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`feather feather-${icon} ${className}`}
        >
            <g dangerouslySetInnerHTML={{__html: iconMarkup}}/>
        </svg>
    );
}