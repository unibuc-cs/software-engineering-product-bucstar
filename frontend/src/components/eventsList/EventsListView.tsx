import React, { useCallback, useEffect, useState } from "react";
import { Container, Divider, FormControl, FormHelperText, MenuItem, Select, Typography } from "@mui/material";
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
    const [dateFilter, setDateFilter] = useState<string>("all");
    const [startDate, setStartDate] = useState<Dayjs | null>(dayjs()); 
    const [endDate, setEndDate] = useState<Dayjs | null>(null); 
    const [filteredEvents, setFilteredEvents] = useState<EventCardModel[]>([]);
    const [sortBy, setSortBy] = useState<string>("date");
    const [sortOrder, setSortOrder] = useState<string>("asc");

    const applyDateFilter = useCallback(() => {
        let filtered = model.eventCardModels;
        if (dateFilter === "custom" && startDate && endDate) {
            filtered = filtered.filter(event => {
                const eventDate = dayjs(event.date);
                return eventDate.isAfter(startDate) && eventDate.isBefore(endDate.add(1, 'day'));
            });
        } else if (dateFilter === "today") {
            filtered = filtered.filter(event => dayjs(event.date).isSame(dayjs(), "day"));
        } else if (dateFilter === "week") {
            filtered = filtered.filter(
                event => 
                    dayjs(event.date).isAfter(dayjs().startOf("week")) && 
                    dayjs(event.date).isBefore(dayjs().endOf("week").add(1, 'day'))
                );
        } else if (dateFilter === "month") {
            filtered = filtered.filter(event => dayjs(event.date).isSame(dayjs(), "month"));
        }
        setFilteredEvents(filtered);
    }, [dateFilter, startDate, endDate, model]);

    const applySorting = useCallback(() => {
        console.log("Sorting by:", sortBy);
        let sortedEvents = [...model.eventCardModels];
        if (sortBy === "date") {
            sortedEvents.sort((a, b) => (sortOrder === "asc" ? dayjs(a.date).diff(dayjs(b.date)) : dayjs(b.date).diff(dayjs(a.date))));
        } else if (sortBy === "participants") {
            sortedEvents.sort((a, b) => (sortOrder === "asc" ? a.registeredParticipants - b.registeredParticipants : b.registeredParticipants - a.registeredParticipants));
         }  else if (sortBy === "recommended") {
            sortedEvents.sort((a, b) => {

                const scoreA = a.registeredParticipants * 5 - dayjs(a.date).diff(dayjs(), 'day');
                const scoreB = b.registeredParticipants * 5 - dayjs(b.date).diff(dayjs(), 'day');

                return sortOrder === "desc" ? scoreA - scoreB : scoreB - scoreA;
            });
        }

        setFilteredEvents(sortedEvents);
    }, [sortBy, sortOrder, model.eventCardModels]);

    useEffect(() => {
        const service = new BrowseEventsService();
        fetchEvents(service)
            .then(model => {
                setModel(model);
                setFilteredEvents(model.eventCardModels);
            })
            .catch(error => console.error("Error fetching events:", error));
    }, [fetchEvents]);

    useEffect(() => {
        applyDateFilter();
    }, [dateFilter, startDate, endDate, model, applyDateFilter]);

    useEffect(() => {
        applySorting();
    }, [sortBy, sortOrder, applySorting]);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container>
                <Typography variant="h3" gutterBottom>
                    {title}
                </Typography>
                <Grid container spacing={2} sx={{ marginBottom: 3 }}> 
                    <Grid size={{xs: 8, sm: 4}}>
                        <FormControl fullWidth>
                            <Select
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                            >
                                <MenuItem value="all">All Dates</MenuItem>
                                <MenuItem value="today">Today</MenuItem>
                                <MenuItem value="week">This Week</MenuItem>
                                <MenuItem value="month">This Month</MenuItem>
                                <MenuItem value="custom">Custom Range</MenuItem>
                            </Select>
                            {dateFilter === "custom" && (!startDate || !endDate) && (
                                <FormHelperText>Please select a start and end date.</FormHelperText>
                            )}
                        </FormControl>
                    </Grid>
                        {dateFilter === "custom" && (
                            <>
                                <Grid size={{xs: 8, sm: 4}}>
                                    <DatePicker
                                        label="Start Date"
                                        value={startDate}
                                        disablePast={true}
                                        onChange={(newValue) => setStartDate(newValue)}
                                    />
                                </Grid>
                                <Grid size={{xs: 8, sm: 4}}>
                                    <DatePicker
                                        label="End Date"
                                        value={endDate}
                                        disablePast={true}
                                        onChange={(newValue) => setEndDate(newValue)}
                                    />
                                </Grid>
                            </>
                        )}

                    <Grid size={{ xs: 8, sm: 4 }}>
                        <FormControl fullWidth>
                            <Select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <MenuItem value="date">Sort by Date</MenuItem>
                                <MenuItem value="participants">Sort by Participants</MenuItem>
                                <MenuItem value="recommended">Sort by Recommended</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid size={{ xs: 8, sm: 4 }}>
                        <FormControl fullWidth>
                            <Select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
                                <MenuItem value="asc">Ascending</MenuItem>
                                <MenuItem value="desc">Descending</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Divider orientation="horizontal" sx={{ marginBottom: 3 }} />
                <Grid container spacing={4}>
                    {filteredEvents.map((eventCardModel, index) => (
                        <Grid size={12} key={index}>
                            <EventCard model={eventCardModel} />
                        </Grid>
                    ))}
                    {filteredEvents.length === 0 && (
                        <Typography variant="h6" align="center" sx={{ marginTop: 3 }}>
                            No events found.
                        </Typography>
                    )}
                </Grid>
            </Container>
        </LocalizationProvider>
    );
};

export default EventsList;
