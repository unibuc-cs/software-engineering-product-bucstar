import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./views/Home";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./assets/theme";
import Navbar from "./components/navbar/Navbar";
import BrowseEventsView from "./browseEvents/BrowseEventsView";

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
                  </Routes>
              </div>
          </ThemeProvider>
      </BrowserRouter>
    );
}

export default App;
