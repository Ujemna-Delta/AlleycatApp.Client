import {ReactElement, useEffect, useState} from "react";
import Race from "../../../../../api/models/race.ts";
import {getUpcomingRaces} from "../../../../../api/races.ts";
import '../right-side-tables.css';
import LoadingIcon from "../../../../../components/loading-icon";

// Rename the component
export default function UpcomingRaces(): ReactElement {
    const [upcomingRaces, setUpcomingRaces] = useState<Race[]>([]);
    const [expandedRaceId, setExpandedRaceId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        setIsLoading(true);
        const fetchUpcomingRaces = async () => {
            try {
                const upcomingRaces = await getUpcomingRaces();
                setUpcomingRaces(upcomingRaces);
            } catch (error) {
                console.error("Failed to fetch upcoming races:", error);
            }
        };

        fetchUpcomingRaces().then(() => {
            setIsLoading(false);
        })
    }, []);

    const toggleDescription = (id: number) => {
        setExpandedRaceId(expandedRaceId === id ? null : id);
    };

    if (isLoading) {
        return (
            <div className="general-container">
                <div className="container-load">
                    <LoadingIcon color="black"/>
                </div>
            </div>
        );
    }

    return (
        <div className="general-container"> {/* Use general container class */}
            <h2>Upcoming Races</h2>
            <div className="general-header">
                <span className="flex-column xlarge">Race Name</span>
                <span className="flex-column small">Date</span>
                <span className="flex-column medium">Address</span>
                <span className="flex-column large">Description</span>
            </div>
            {upcomingRaces.map(race => (
                <div
                    className={`general-item ${expandedRaceId === race.id ? 'expanded' : ''}`}
                    key={race.id}
                    onClick={() => toggleDescription(race.id)}
                >
                    <span className="flex-column xlarge">{race.name}</span>
                    <span className="flex-column small">{race.beginTime.toLocaleDateString()}</span>
                    <span className="flex-column medium">{race.startAddress}</span>
                    <span className="flex-column large">{race.description}</span>
                </div>
            ))}
        </div>
    );
}