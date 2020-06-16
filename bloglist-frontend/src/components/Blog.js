import React, { useState }  from 'react'
import blogService from '../services/blogs'



const Blog = ({ blog , deletePost }) => {
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
  const onClickLikePost = () => {
    blogService.like(blog.id)
    setLikes(likes+1)
  }

  return (
    <div style={blogStyle} className={'blog-class'}>
      <div style={hideWhenVisible} className={'title-class'}>
        {blog.title}
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className={'after-view-click-class'}>
        <div className={'title-class'}>
          {blog.title}
          <button onClick={toggleVisibility}>hide</button> 
        </div>
        <div className={'url-class'}>
          {blog.url}
        </div>
        <div className={'likes-class'}>
          likes: {likes} <button onClick={onClickLikePost}>like</button><br></br>
        </div> 
        <div className={'author-class'}>
          {blog.author}
        </div>
        <button onClick={() => deletePost(blog.id)}>delete</button>
      </div>
    </div>
  )
}

export default Blog


