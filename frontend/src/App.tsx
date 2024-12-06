import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./views/Home";
import {CssBaseline, ThemeProvider} from "@mui/material";
import theme from "./assets/theme";
import BrowseEvents from "./views/BrowseEvents";
import Navbar from "./components/navbar/Navbar";

function App() {
    return (
      <BrowserRouter>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <div className="App">
                  <Navbar />
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/events" element={<BrowseEvents />} />
                  </Routes>
              </div>
          </ThemeProvider>
      </BrowserRouter>
    );
}

export default App;
