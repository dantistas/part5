import React, { useState }  from 'react'
import blogService from '../services/blogs'



const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const onClickLikePost = () =>{
    blogService.like(blog.id)
    setLikes(likes+1)// use state to update xD
  }

  return (
  <div style={blogStyle} >
    <div style={hideWhenVisible} >
    {blog.title}
    <button onClick={toggleVisibility}>view</button>
    </div>
    <div style={showWhenVisible}>
    {blog.title}
    <button onClick={toggleVisibility}>hide</button><br></br>
    {blog.url}<br></br>
    likes: {likes} <button onClick={onClickLikePost}>like</button><br></br>
    {blog.author}<br></br>
    {blog.id}
    </div>
  </div>
  )}

export default Blog


