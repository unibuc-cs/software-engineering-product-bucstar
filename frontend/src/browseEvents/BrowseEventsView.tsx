import {Container, Typography} from "@mui/material";
import React from "react";
import {EventCardModel} from "./eventCard/EventCardModel";
import EventCard from "./eventCard/EventCard";
import {BrowseEventsModel} from "./BrowseEventsModel";
import {BrowseEventsService} from "./BrowseEventsService";
import Grid from "@mui/material/Grid2";

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
            
            <Grid container spacing={8}>
                {eventCardModels.map((eventCardModel, index) => (
                    <Grid size={12} key={index}>
                        <EventCard model={eventCardModel} />
                    </Grid>
                ))}
            </Grid>
                

        </Container>
    )
}

export default BrowseEvents;