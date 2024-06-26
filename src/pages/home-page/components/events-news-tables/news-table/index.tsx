import {ReactElement, useEffect, useState} from "react";
import {newsData} from '../../../../../../public/mockData.ts';
import '../events-news-table.css';
import LoadingIcon from "../../../../../components/loading-icon";

export default function NewsTable(): ReactElement {
    const [timeElapsed, setTimeElapsed] = useState<string[]>([]);
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Calculate the time elapsed for each news item
    useEffect(() => {
        const calculateTimeElapsed = () => {
            const currentTime = new Date().getTime();
            const elapsedTimes = newsData.map((item) => {
                const postedTime = new Date(item.date).getTime();
                const timeDifference = currentTime - postedTime;
                if (timeDifference < 60 * 60 * 1000) {
                    return "now";
                }
                const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                if (days > 0) {
                    return `${days}d, ${hours}h`;
                } else {
                    return `${hours}h`;
                }
            });
            setTimeElapsed(elapsedTimes);
        };

        calculateTimeElapsed();

        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 250);
    }, []);

    const toggleDescription = (index: number) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    };

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
            {newsData.map((item, index) => (
                <div
                    className={`info-item ${expandedIndex === index ? 'expanded' : ''}`}
                    key={index}
                    onClick={() => toggleDescription(index)}
                >
                    <img src={item.imageUrl} alt={item.title} className="info-image"/>
                    <div className="info-content">
                        <div className="info-title-date">
                            <h3 className="info-title">{item.title}</h3>
                            <span className="info-time">{timeElapsed[index]}</span>
                        </div>
                        <p className="info-description-text">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
