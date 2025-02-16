import React from 'react'
import LoginForm from '../Components/LoginForm'
import Navbar from '../Components/Navbar'
import BottomBar from '../Components/BottomBar'

const LoginPage = () => {
  return (
    <div>
    <Navbar/>
    <LoginForm/>
    <BottomBar/>
    </div>
  )
}

export default LoginPage