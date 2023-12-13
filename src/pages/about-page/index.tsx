import {ReactElement} from "react";
import "./about-page.css";

export default function AboutPage(): ReactElement {
    return (
        <div className="about-page">

            <h1>Resources</h1>

            <h2>Icons</h2>
            <ul>
                <li>
                    Feather Icons on MIT license from https://github.com/feathericons/feather
                </li>
            </ul>

            <h2>Images</h2>
            <ul>
                <li>
                    <a href="https://www.flaticon.com/free-icons/user" title="user icons">User icons created by Freepik
                        - Flaticon</a>
                </li>
            </ul>

        </div>
    )
}