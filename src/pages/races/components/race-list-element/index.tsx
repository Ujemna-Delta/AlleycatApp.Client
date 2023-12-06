import {ReactElement} from "react";
import Race from "../../../../models/race.ts";
import "./race-list-element.css";
import {PrimaryButton} from "@fluentui/react";

interface RaceProps {
    race: Race;
}

export default function RaceListElement({race}: RaceProps): ReactElement {
    return (
        <div className="race-list-element">
            <div className="race-list-element-group">
                <div className="race-list-element-id">#{race.id}</div>
                <div className="race-list-element-name">{race.name}</div>
                <div className="race-list-element-description">{race.description}</div>
            </div>
            <div className="race-list-element-group">
                <PrimaryButton text="Details"/>
            </div>
        </div>
    );
}