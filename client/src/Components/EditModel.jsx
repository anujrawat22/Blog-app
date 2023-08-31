import { Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'

const EditModel = () => {
    return (
        <div style={{ border: '1px solid red', position: "fixed", width: "25dvw", height: "50dvh", top: "25%", right: "40%", backgroundColor: "white", borderRadius: '15px' }}>
            <form >
                <Stack sx={5}>
                    <Typography variant='h6'>Edit </Typography>
                    <TextField variant='outlined' placeholder='Title' />

                    <TextField variant='outlined' placeholder='Content' />
                    <Button variant='outlined' type='submit'>Update</Button>
                </Stack>
            </form>
        </div>
    )
}

export default EditModel