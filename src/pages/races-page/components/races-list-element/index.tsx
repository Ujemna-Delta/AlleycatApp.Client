import {ReactElement} from "react";
import Race from "../../../../api/models/race.ts";
import "./races-list-element.css";
import {PrimaryButton} from "@fluentui/react";
import {NavLink} from "react-router-dom";
import FeatherIcon from "../../../../components/feather-icon";

interface RacesListElementProps {
    race: Race
}

export default function RacesListElement({race}: RacesListElementProps): ReactElement {
    const formatTime = (date: Date): string => {
        return date.toLocaleString();
    }

    return (
        <div className="races-list-element">
            <div className="races-list-element-group races-list-element-summary">
                <div className="races-list-element-id">#{race.id}</div>
                <div className="races-list-element-name">{race.name}</div>
                <div className="races-list-element-date">
                    <FeatherIcon icon="clock"/>
                    {formatTime(race.beginTime)}
                </div>
                <div className="races-list-element-participants">
                    <FeatherIcon icon="users"/>
                    {race.id}
                </div>
            </div>
            <div className="races-list-element-group">
                <NavLink to={`../race/${race.id}`}>
                    <PrimaryButton text="Details"/>
                </NavLink>
            </div>
        </div>
    );
}