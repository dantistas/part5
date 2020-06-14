import React, { useState }  from 'react'
import blogService from '../services/blogs'



const Blog = ({blog , deletePost}) => {
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
    setLikes(likes+1)
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
    <button onClick={() => deletePost(blog.id)}>delete</button>
    </div>
  </div>
  )
}

export default Blog


