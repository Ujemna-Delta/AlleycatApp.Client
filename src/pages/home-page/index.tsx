import {ReactElement} from "react";
import UpcomingRaces from './components/right-side-tables/upcoming-races'; // The renamed component that was previously HomePage
import NewsTable from './components/events-news-tables/news-table';
import EventsTable from './components/events-news-tables/events-table';
import LeaderboardTable from "./components/right-side-tables/laderboard";
import './home-page.css'; // Ensure this CSS file styles the layout of the home page correctly

export default function HomePage(): ReactElement {
    return (
        <div className="home-page">
            <div className="left-side-tables">
                <NewsTable/>
                <EventsTable/>
            </div>
            <div className="right-side-tables">
                <UpcomingRaces/>
                <LeaderboardTable />
            </div>
        </div>
    );
};
