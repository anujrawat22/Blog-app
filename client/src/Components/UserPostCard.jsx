import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectPost } from '../features/postSlice';

const UserPostCard = ({ title, content, _id, author }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const viewpost = (id) => {
        dispatch(selectPost(id))
        navigate(`/viewpost/${id}`)
    }

    return (
        <Card sx={{ minWidth: 300, maxWidth: 350, p: 2 }}  >
            <CardContent>
                <Typography variant="h5" color="#1976d2">{title}</Typography>
                <Typography sx={{ mb: 2 }} variant='subtitle1' color="text.secondary">{author.username}</Typography>
                <Typography variant="body2" color="text.primary">{content}</Typography>
            </CardContent>
            <CardActions>
                <Button variant='outlined' onClick={() => viewpost(_id)}>Show Post</Button>
            </CardActions>
        </Card>
    )
}

export default UserPostCard