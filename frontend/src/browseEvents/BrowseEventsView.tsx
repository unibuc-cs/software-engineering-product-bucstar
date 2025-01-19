import {BrowseEventsService} from "./BrowseEventsService";
import EventsList from "../components/eventsList/EventsListView";

const BrowseEvents = () => { 
    const fetchEvents = (service : BrowseEventsService) => service.getBrowseEventsModel();
    return ( 
        <EventsList 
            title="Browse Events" 
            fetchEvents={fetchEvents} 
        /> 
    ); 
};

export default BrowseEvents;