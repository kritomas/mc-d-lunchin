import React from 'react'
import LunchReviewCard from '../Components/LunchReviewCard'
import Navbar from '../Components/Navbar'
import BottomBar from '../Components/BottomBar'
import LunchMenu from '../Components/LunchMenu'

const Dashboard = () => {
  return (
    <div>
    <Navbar/>
    <LunchMenu/>
    <BottomBar/>
    </div>
  )
}

export default Dashboard