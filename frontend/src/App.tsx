import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./views/Home";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./assets/theme";
import Navbar from "./components/navbar/Navbar";
import BrowseEventsView from "./browseEvents/BrowseEventsView";
import ViewEventView from "./viewEvent/ViewEventView";
import CreateEventView from "./createEvent/CreateEventView";
import RegisteredEventsView from './registeredEvents/RegisteredEventsView';

function App() {
    return (
      <BrowserRouter>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <div className="App">
                  <Navbar />
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/events" element={<BrowseEventsView />} />
                      <Route path="/events/:id" element={<ViewEventView/>} />
                      <Route path="/events/new" element={<CreateEventView/>} />
                      <Route path="/events/:id/edit" element={<CreateEventView/>} />
                      <Route path="/events/registered" element={<RegisteredEventsView />} />
                  </Routes>
              </div>
          </ThemeProvider>
      </BrowserRouter>
    );
}

export default App;
