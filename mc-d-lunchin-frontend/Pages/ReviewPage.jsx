import React from 'react'
import Navbar from '../Components/Navbar'
import BottomBar from '../Components/BottomBar'
import ReviewComponent from '../Components/ReviewComponent'
import LunchReviewCard from '../Components/LunchReviewCard'

const ReviewPage = () => {
  return (
    <div>
    <Navbar/>
    <ReviewComponent/>
    <LunchReviewCard/>
    <BottomBar/>
    </div>
  )
}

export default ReviewPage