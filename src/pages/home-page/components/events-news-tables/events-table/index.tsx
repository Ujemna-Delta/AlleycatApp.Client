import {ReactElement, useEffect, useState} from "react";
import {upcomingEventsData} from '../../../../../../public/mockData.ts';
import '../events-news-table.css';
import LoadingIcon from "../../../../../components/loading-icon";

export default function EventsTable(): ReactElement {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const toggleDescription = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    useEffect(() => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 250);
    }, []);

    if (isLoading) {
        return (
            <div className="table-info">
                <div className="container-load">
                    <LoadingIcon color="black"/>
                </div>
            </div>
        );
    }

    return (
        <div className="info-table">
            {upcomingEventsData.map((item, index) => (
                <div
                    className={`info-item ${expandedIndex === index ? 'expanded' : ''}`}
                    key={index}
                    onClick={() => toggleDescription(index)}
                >
                    <img src={item.imageUrl} alt={item.name} className="info-image"/>
                    <div className="info-content">
                        <div className="info-title-date">
                            <h3 className="info-title">{item.name}</h3>
                            <p className="info-date">{item.date}</p>
                        </div>
                        <p className="info-description-text">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}