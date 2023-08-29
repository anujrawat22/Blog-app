import { Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
 const navigate = useNavigate()

 const gotologin = ()=>{
    navigate('/login')
 }

 useEffect(()=>{
    gotologin()
 })
  return (
    <div>
        <Typography variant='h2'>Welcome to Blog App</Typography>
    </div>
  )
}

export default Home