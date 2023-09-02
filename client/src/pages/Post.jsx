import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPostDetails } from '../features/postSlice';
import { Button, Chip, Container, Divider, Stack, TextField, Typography } from '@mui/material';
import { addComment, fetchCommentForPost } from '../features/commentSlice';
import Comment from '../Components/Comment';

const Post = () => {
  const dispatch = useDispatch();
  const { postId } = useParams();
  const token = useSelector(state => state.auth.token)
  const selectedPost = useSelector((state) => state.posts.selectedPost);
  const comments = useSelector(state => state.comments.comments)

  const [newComment, setnewComment] = useState('')
  useEffect(() => {
    if (postId) {
      dispatch(fetchPostDetails(postId));
      dispatch(fetchCommentForPost(postId))
    }
  }, [dispatch, postId]);
  if (!selectedPost) {
    return <Typography>Loading...</Typography>;
  }

  const handleChange = (e) => {
    setnewComment(e.target.value)
  }

  const handelComment = () => {
    if (token) {

      dispatch(addComment({ text: newComment, post: selectedPost._id }))
      setnewComment('')
    } else {
      alert("Please Login to Comment on this post")
    }
  }


  return (
    <div  className='postDiv'>
      <Container maxWidth="m">
        <Stack direction="column" spacing={4}>
          <Typography variant="h5" color={'#1976d2'}>{selectedPost.title}</Typography>
          <Divider></Divider>
          <Typography color={'#808080'}>{selectedPost.content}</Typography>
          <Divider ><Chip label="COMMENTS" /></Divider>
          <Stack direction="column" spacing={2}>
            {
              comments.length > 0 ?
                comments.map((el) => {
                  return <Comment key={el._id} {...el} />
                })
                :
                <Typography >No Comments yet</Typography>
            }
          </Stack>
          <Stack direction="row" spacing={2}>
            <TextField id="standard-basic" label="Add Comment" variant="standard" name='newComment' value={newComment} onChange={handleChange} />
            <Button variant='outline' onClick={handelComment}>Add</Button>
          </Stack>
        </Stack>
      </Container>
    </div>
  )
}

export default Post