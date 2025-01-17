import {Container, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import Grid from "@mui/material/Grid2";
import { BrowseEventsModel } from "../browseEvents/BrowseEventsModel";
import { BrowseEventsService } from "../browseEvents/BrowseEventsService";
import EventCard from "../browseEvents/eventCard/EventCard";

const RegisteredEvents = (
) => {
    const [model, setModel] = useState<BrowseEventsModel>(
        new BrowseEventsModel()
    );

    useEffect(() => {
        const service = new BrowseEventsService();
        service.getBrowseRegisteredEventsModel()
            .then(model => setModel(model))
            .catch(error => console.error("Error fetching events:", error));
    }, []);
    
    const eventCardModels = model.eventCardModels
    
    
    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Registered Events
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

export default RegisteredEvents;