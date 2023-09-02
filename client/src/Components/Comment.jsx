
import React from 'react'

const Comment = (props) => {
 
  return (
   <div className='comment'>
    <div style={{ width : '50%'}}>
    <h4 style={{color : "#1976d2"}}>{props.author.username}  <span style={{marginLeft : '2%',fontSize : '13px' ,color : "GrayText"}}>{props.text}</span></h4>
    </div>
    <h6 style={{color : "GrayText"}}>{props.createdAt.split("T")[0].split("-").reverse().join("-")}</h6>
   </div>
  )
}

export default Comment