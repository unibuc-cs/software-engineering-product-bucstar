import {Container, Typography} from "@mui/material";
import React from "react";
import {EventCardModel} from "./eventCard/EventCardModel";
import EventCard from "./eventCard/EventCard";
import {BrowseEventsModel} from "./BrowseEventsModel";
import {BrowseEventsService} from "./BrowseEventsService";

const BrowseEvents = (
) => {
    const service: BrowseEventsService = new BrowseEventsService();
    const model: BrowseEventsModel = service.getBrowseEventsModel()
    const eventCardModels: EventCardModel[] = model.eventCardModels
    
    
    
    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Browse Events
            </Typography>
            <>
                {eventCardModels.map(eventCardModel => {
                    return <EventCard key={eventCardModel.name} model={eventCardModel} />
                })}
            </>

        </Container>
    )
}

export default BrowseEvents;