import React from 'react';
import './App.css';
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./views/Home";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const theme = createTheme({
    typography: {
        fontFamily: '"Roboto", sans-serif'
    }
});

function App() {
  return (
      <BrowserRouter>
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <div className="App">
                  <Navbar />
                  <Routes>
                      <Route path="/" element={<Home />} />
                  </Routes>
              </div>
          </ThemeProvider>
      </BrowserRouter>
  );
}

export default App;
