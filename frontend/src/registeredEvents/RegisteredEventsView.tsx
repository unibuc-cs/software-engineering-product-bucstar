import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import { BrowseEventsService } from "../browseEvents/BrowseEventsService";
import EventsList from "../components/eventsList/EventsListView";

const RegisteredEvents = () => {
  const [activeTab, setActiveTab] = useState(0);

  const fetchUpcomingEvents = (service: BrowseEventsService) =>
    service.getRegisteredUpcomingEvents();

  const fetchPastEvents = (service: BrowseEventsService) =>
    service.getRegisteredPastEvents();

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        centered
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Upcoming Events" />
        <Tab label="Past Events" />
      </Tabs>
      <Box sx={{ marginTop: 3 }}>
        {activeTab === 0 && (
          <EventsList
            title=""
            fetchEvents={fetchUpcomingEvents}
          />
        )}
        {activeTab === 1 && (
            <EventsList
            title=""
            fetchEvents={fetchPastEvents}
          />
        )}
      </Box>
    </Box>
  );
};

export default RegisteredEvents;
