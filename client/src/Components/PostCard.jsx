
import React from 'react'
import { useDispatch } from 'react-redux'
import { deletePost } from '../features/postSlice'


const PostCard = ({ title, content, _id, openModal, setEditData }) => {

    const handleEdit = () => {
        openModal()
        setEditData({ title: title, content: content , id : _id})
    }

    const dispatch = useDispatch()
    return (
        <div style={{ width: '350px', height: 'auto', maxHeight: "500px", padding: '2%', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px', borderRadius: "3%", display: 'flex', flexDirection: 'column', justifyContent: "space-around" }}>
            <h1 style={{ color: '#1976d2' }}>{title}</h1>
            <div className='postcardContent' style={{ height: '60%', overflow: 'scroll', overflowX: 'hidden' }}>
                <p>{content}</p>
            </div>
            <div style={{ height: 'auto', display: 'flex', alignItems: "center", columnGap: '15px' }}>
                <button className='button' onClick={handleEdit}>Edit</button>
                <button className='button' onClick={() => dispatch(deletePost(_id))}>Delete</button>
            </div>
  
        </div>
    )
}

export default PostCard