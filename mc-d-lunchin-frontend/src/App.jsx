import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import './App.css'
import LandingPage from '../Pages/LandingPage'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginPage from '../Pages/LoginPage'

const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#535bf2',
    },
  },
});



function App() {
  return (
    <ThemeProvider theme={darkTheme}>
    <Router>
      <div className="App">

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  )
}

export default App
