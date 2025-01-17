import { BrowseEventsService } from "../browseEvents/BrowseEventsService";
import EventsList from "../components/eventsList/EventsListView";

const RegisteredEvents = () => { 
    const fetchEvents = (service : BrowseEventsService) => service.getBrowseRegisteredEventsModel();
    return ( 
        <EventsList 
            title="Registered Events" 
            fetchEvents={fetchEvents} 
        /> 
    ); 
};

export default RegisteredEvents;