import React from 'react'
import Navbar from '../Components/Navbar'
import BottomBar from '../Components/BottomBar'
import ReviewPerUser from '../Components/ReviewPerUser'

const UserReview = () => {
  return (
    <div>
    <Navbar/>
    <ReviewPerUser/>

    <BottomBar/>
    </div>
  )
}

export default UserReview