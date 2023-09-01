import { Typography } from '@mui/material';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PostCard from '../Components/PostCard';
import { fetchUserPosts } from '../features/postSlice';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';
import EditModel from '../Components/EditModel';
import { FlashlightOffRounded } from '@mui/icons-material';

const ManagePost = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const dispatch = useDispatch()
  const { token } = useSelector(state => state.auth);
  const [EditData, setEditData] = useState({ title: '', content: '', id: '' })
  const posts = useSelector(state => state.posts.posts)

  const fetchPosts = () => {
    dispatch(fetchUserPosts(token))
  }
  useEffect(() => {
    fetchPosts()
  }, [dispatch])


  const openModal = () => {
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
  }


  return (
    <>

      <div style={{ display: "flex", flexWrap: "wrap", margin: 'auto', marginTop: "5dvh", width: "80dvw", justifyContent: "space-around", height: "auto", rowGap: '50px' }}>
        {
          posts.length > 0 ? posts.map((el) => {
            return <PostCard key={el._id} {...el} openModal={openModal} setEditData={setEditData} />
          })
            :
            <Typography variant='h5'>No Post added yet</Typography>
        }
        <div style={{ boxShadow: 'rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px', position: 'fixed', top: "86%", right: "3%", height: '60px', width: "60px", borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Link to='/addpost'><AddIcon sx={{ fontSize: 40 }} color='primary' /></Link></div>
      </div>
      {isModalOpen ? <EditModel {...EditData} closeModal={closeModal} /> : null}
    </>
  )
}

export default ManagePost