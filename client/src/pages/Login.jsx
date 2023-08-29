import { Button, Container, Stack, TextField, Typography } from '@mui/material'

import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { loginUser } from '../features/authSlice'



const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm()

    const navigateCallback = (responseData) => {
        if (responseData.role === 'reader') {
            navigate("/allposts")
        } else if (responseData.role === 'author') {
            navigate("/addpost")
        }
    };


    const loginform = async (data) => {
        dispatch(loginUser({ data, extra: navigateCallback }))
    }
    return (
        <>
            <div style={{ margin: "auto", width: "30dvw", height: "auto", marginTop: "10dvh", boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", padding: "7rem 0", borderRadius: "5%" }} >
                <Typography variant="h4" textAlign={"center"}>
                    Login
                </Typography>;
                <Container maxWidth="xs" >
                    <form onSubmit={handleSubmit((data) => {
                        loginform(data)
                    })}>
                        <Stack spacing={2}>
                            <Typography variant='caption' color={"red"}>{errors.email?.message}</Typography>


                            <TextField id="outlined-basic" label="Email" variant="outlined" size="small" {...register('email', {
                                required: "Required field *", pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                                    message: 'Please enter correct email',
                                },
                            })} />


                            <Typography variant='caption' color={"red"}>{errors.password?.message}</Typography>


                            <TextField id="outlined-basic" label="Password" variant="outlined" size="small" type='password' {...register('password', { required: "Required field *" })} />
                            <Button variant='outlined' type='submit'>LOGIN</Button>
                            <Typography variant='subtitle2' textAlign={"center"}>New User ? <Link to={'/signup'} style={{ color: "#1976d2" }}>Signup</Link></Typography>
                        </Stack>
                    </form>
                </Container>
            </div>

        </>
    )
}

export default Login