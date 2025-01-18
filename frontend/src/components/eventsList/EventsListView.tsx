import React, { useEffect, useState } from "react";
import { Container, Divider, FormHelperText, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import EventCard from "./eventCard/EventCard";
import { BrowseEventsModel } from "../../browseEvents/BrowseEventsModel";
import { BrowseEventsService } from "../../browseEvents/BrowseEventsService";
import { EventCardModel } from "./eventCard/EventCardModel";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

const EventsList = ({ title, fetchEvents } : { title: string, fetchEvents: (service : BrowseEventsService) => Promise<BrowseEventsModel>}) => {
    const [model, setModel] = useState<BrowseEventsModel>(new BrowseEventsModel());
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs()); 
    const [endDate, setEndDate] = useState<Dayjs | null>(null); 
    const [filteredEvents, setFilteredEvents] = useState<EventCardModel[]>([]);

    const dateToShow = () => {
            if (startDate == null) {
                return dayjs();
            }
            return dayjs(startDate);
        }

    useEffect(() => {
        const service = new BrowseEventsService();
        fetchEvents(service)
            .then(model => {
                setModel(model)
                setFilteredEvents(model.eventCardModels);
            })
            .catch(error => console.error("Error fetching events:", error));
    }, [fetchEvents]);

    useEffect(() => { 
        if (startDate && endDate) {
             const filtered = model.eventCardModels.filter(event => { 
                const eventDate = dayjs(event.date); 
                return eventDate.isAfter(startDate) && eventDate.isBefore(endDate.add(1, 'day')); 
            }); 
            setFilteredEvents(filtered); 
        } else {
            setFilteredEvents(model.eventCardModels); 
        } }, [startDate, endDate, model]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container>
                <Typography variant="h3" gutterBottom>
                    {title}
                </Typography>
                <Grid container spacing={2}> 
                    <Grid size={{xs: 12, sm: 6}}>
                        <DatePicker
                            label="Start Date" 
                            defaultValue={dateToShow()}
                            disablePast={true} 
                            onChange={(newValue) => setStartDate(newValue)} 
                            />
                        {startDate && !endDate && ( 
                            <FormHelperText>Please select an end date to apply the filter</FormHelperText> 
                        )} 
                    </Grid> 
                    <Grid size={{xs: 12, sm: 6}}> 
                        <DatePicker label="End Date" 
                        value={endDate}
                        disablePast={true} 
                        onChange={(newValue) => setEndDate(newValue)} 
                        />
                    </Grid> 
                </Grid>
                <Grid size={12}>
                    <Divider orientation="horizontal" />
                </Grid>
                <Grid container spacing={8}>
                    {filteredEvents.map((eventCardModel, index) => (
                        <Grid size={12} key={index}>
                            <EventCard model={eventCardModel} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </LocalizationProvider>
    );
};

export default EventsList;
