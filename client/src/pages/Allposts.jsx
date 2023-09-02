import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPosts, searchPosts } from '../features/postSlice';
import { Pagination, Stack, TextField } from '@mui/material';
import UserPostCard from '../Components/UserPostCard';




const Allposts = () => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [order, setOrder] = useState(0)
  const posts = useSelector(state => state.posts.posts)



  const handletitlesearch = (e) => {
    setTitle(e.target.value)
    setCurrentPage(1)
    dispatch(searchPosts({ title: e.target.value, page: currentPage }))
  }

  const handleauthorsearch = (e) => {
    setAuthor(e.target.value)
    setCurrentPage(1)
    dispatch(searchPosts({ author: e.target.value, page: currentPage }))
  }

  useEffect(() => {
    dispatch(fetchAllPosts({ page: currentPage, order }))
  }, [dispatch])

  return (<>
    <div style={{ width: "80dvw", margin: 'auto', marginTop: '5dvh', height: 'auto', display: "flex", flexWrap: 'wrap', justifyContent: "center" }}>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-around' }}>
        <TextField label="Title" variant="standard" onChange={handletitlesearch} value={title} />
        <TextField label="Author" variant="standard" onChange={handleauthorsearch} value={author} />
        <TextField
          id="standard-select-currency-native"
          select
          label="Sort"
          defaultValue=""
          variant="standard"
          SelectProps={{
            native: true,
          }}
          helperText="Posts by date"
          onChange={(e) => {
            setOrder(e.target.value)
            setCurrentPage(1)
            dispatch(fetchAllPosts({ page: currentPage, order: e.target.value }))
          }}
        >
          <option value={0}></option>
          <option value={1}>ASC</option>
          <option value={-1}>DESC</option>
        </TextField>
      </div>
    </div>
    <div  className='AllPosts'>

      {
        posts.length > 0 ? posts.map((el) => {
          return <UserPostCard key={el._id} {...el} />
        })
          :
          <h1 style={{textAlign : 'center',display : 'block',width : '80dvw'}}>No Posts to Show</h1>
      }
    </div>
    <div style={{ margin: 'auto', display: 'flex', justifyContent: "center", padding: '5%' }} >
      <Stack spacing={2}>
        <Pagination count={10} color="primary" defaultPage={currentPage}
          onChange={(e, value) => {
            setCurrentPage(value)
            dispatch(fetchAllPosts({ page: value, order }))
          }
          } />
      </Stack>
    </div>
  </>
  )
}

export default Allposts