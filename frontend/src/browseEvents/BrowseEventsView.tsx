import {Container, Typography} from "@mui/material";
import React from "react";
import {EventCardModel} from "./eventCard/EventCardModel";
import EventCard from "./eventCard/EventCard";

const eventCardModel: EventCardModel = new EventCardModel("name", "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"", "location", new Date(Date.now()), 
    "organizer", 12, 6, ["sport", "outdoor", "teams"]);

const BrowseEvents = () => {
    return (
        <Container>
            <Typography variant="h3" gutterBottom>
                Browse Events
            </Typography>
            <EventCard model = {eventCardModel} />
            <EventCard model = {eventCardModel} />
            <EventCard model = {eventCardModel} />
        </Container>
    )
}

export default BrowseEvents;