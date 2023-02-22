import React from 'react'
import { Link } from 'react-router-dom'
import ErrorOutline from "@material-ui/icons/ErrorOutline"
import "../cart/Success.css"
import { Typography } from '@material-ui/core'
const UnAuthorized = () => {
  return (
    <div className='orderSuccess'>
        <ErrorOutline/>
        <Typography>Your are Not Authorized for this route 😂😂.</Typography>
        <Link to="/login">Go to Login.</Link>
    </div>
  )
}

export default UnAuthorized