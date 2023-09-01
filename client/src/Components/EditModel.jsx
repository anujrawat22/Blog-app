import { Button, Stack, TextField, TextareaAutosize, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updatePosts } from '../features/postSlice'

const EditModel = ({ id, title, content, closeModal }) => {
    const [data, setData] = useState({ title, content })
    const dispatch = useDispatch()
    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })

    }
    return (
        <div className='editModal' style={{ position: "fixed", width: "450px", height: "auto", top: "50%", left: "50%", transform: "translate(-50%,-50%)", backgroundColor: "white", borderRadius: '10px', backdropFilter: '5', zIndex: '5', margin: 'auto' }} key={id}>
            <Stack spacing={3}>
                <Typography variant='h6'>Edit </Typography>
                <TextField variant='outlined' name='title' value={data.title} onChange={handleChange} placeholder='Title' />

                <TextareaAutosize variant='outlined' placeholder='Content' name='content' value={data.content} onChange={handleChange} minRows={6}/>
                <Button variant='outlined' onClick={() => {
                    dispatch(updatePosts({ title: data.title, content: data.content, id }))
                    closeModal()
                }}>Update</Button>
            </Stack>

        </div>
    )
}

export default EditModel