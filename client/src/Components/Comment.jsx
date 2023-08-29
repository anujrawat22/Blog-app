import { Stack, Typography } from '@mui/material'
import React from 'react'

const Comment = ({ text, author }) => {
  return (
    <Stack direction="row">
      <Typography variant='subtitle2'>
        {author.username}<span style={{color : "gray",marginLeft : "10px"}}>{text}</span>
      </Typography>
    </Stack>
  )
}

export default Comment