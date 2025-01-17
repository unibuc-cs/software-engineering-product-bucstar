import React, { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import EventCard from "./eventCard/EventCard";
import { BrowseEventsModel } from "../../browseEvents/BrowseEventsModel";
import { BrowseEventsService } from "../../browseEvents/BrowseEventsService";

const EventsList = ({ title, fetchEvents } : { title: string, fetchEvents: (service : BrowseEventsService) => Promise<BrowseEventsModel>}) => {
    const [model, setModel] = useState<BrowseEventsModel>(new BrowseEventsModel());

    useEffect(() => {
        const service = new BrowseEventsService();
        fetchEvents(service)
            .then(model => setModel(model))
            .catch(error => console.error("Error fetching events:", error));
    }, [fetchEvents]);

    const eventCardModels = model.eventCardModels;

    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                {title}
            </Typography>
            <Grid container spacing={8}>
                {eventCardModels.map((eventCardModel, index) => (
                    <Grid size={12} key={index}>
                        <EventCard model={eventCardModel} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default EventsList;
