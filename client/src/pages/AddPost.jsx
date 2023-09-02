import { Button, Container, Stack, TextField, Typography } from '@mui/material'

import React from 'react'
import { useForm } from 'react-hook-form'

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewPost } from '../features/postSlice';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const AddPost = () => {
  const MySwal = withReactContent(Swal)
  const navigate = useNavigate()
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm()



  const AddPost = (data) => {
    dispatch(createNewPost(data, token))
    MySwal.fire({
      icon: 'success',
      text: "Blog post added",
      showConfirmButton: false,
      timer: 1000
    }
    )
    navigate('/manage')
  }

  return (
    <div style={{ margin: "auto", height: "auto", marginTop: "10dvh",  padding: "2rem 0" }} className='Addpost_div'>
      <Typography variant="h4" textAlign={"center"}>
        Add new Post
      </Typography>
      <Container maxWidth="xs" >
        <form onSubmit={handleSubmit((data) => {
          AddPost(data)
        })}>
          <Stack spacing={3}>
            <Typography variant='caption' color={"red"}>{errors.title?.message}</Typography>
            <TextField id="outlined-basic" label="title" variant="outlined" size="small" {...register('title', { required: "Required field *" })} />
            <Typography variant='caption' color={"red"}>{errors.content?.message}</Typography>
            <TextField
              id="outlined-multiline-static"
              label="Content"
              multiline
              rows={4}
              {...register('content', { required: "Required field *" })}
            />
            <Button variant='outlined' type='submit' >Add Post</Button>
          </Stack>
        </form>
      </Container>
    </div>
  )
}

export default AddPost