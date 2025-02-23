import React from 'react'
import LunchReviewCard from '../Components/LunchReviewCard'
import Navbar from '../Components/Navbar'
import BottomBar from '../Components/BottomBar'

const Dashboard = () => {
  return (
    <div>
    <Navbar/>
    <LunchReviewCard/>
    <BottomBar/>
    </div>
  )
}

export default Dashboard