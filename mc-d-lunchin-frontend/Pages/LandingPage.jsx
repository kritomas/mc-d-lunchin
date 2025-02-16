import React from 'react'
import BottomBar from '../Components/BottomBar'
import Navbar from '../Components/Navbar'
import AboutUs from '../Components/AboutUs'
import ToggleColorMode from '../Components/ToggleColorMode'

const LandingPage = () => {
  return (
    <div>
    <Navbar/>
    <AboutUs/>
    <BottomBar/>
    </div>
  )
}

export default LandingPage