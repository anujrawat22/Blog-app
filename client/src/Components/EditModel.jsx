import { Button, Stack, TextField, TextareaAutosize, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updatePosts } from '../features/postSlice'
import CancelIcon from '@mui/icons-material/Cancel';

const EditModel = ({ id, title, content, closeModal }) => {
    const [data, setData] = useState({ title, content })
    const dispatch = useDispatch()
    const handleChange = (e) => {
        const { name, value } = e.target
        setData({ ...data, [name]: value })

    }
    return (
        <div className='editModal' key={id}>
            <div style={{display : 'flex' , justifyContent : 'space-between', margin : '5% 0% '}}>
                <Typography variant='h6'>Edit </Typography>
                <CancelIcon onClick={() => closeModal()} />
            </div>
            <Stack spacing={3}>
                
                <TextField variant='outlined' name='title' value={data.title} onChange={handleChange} placeholder='Title' />

                <TextareaAutosize variant='outlined' placeholder='Content' name='content' value={data.content} onChange={handleChange} minRows={6} />
                <Button variant='outlined' onClick={() => {
                    dispatch(updatePosts({ title: data.title, content: data.content, id }))
                    closeModal()
                }}>Update</Button>
            </Stack>

        </div>
    )
}

export default EditModel