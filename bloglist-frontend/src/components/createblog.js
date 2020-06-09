import React, { useState }  from 'react'
import blogService from '../services/blogs'


const CreateNewBlog = ({setNotification,setBlogs,user,blogs}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = async (e) => {
      e.preventDefault()
      blogService.setToken(user.token)
      const returnedBlogs = await blogService.create({title, author, url,})
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(returnedBlogs))
      setNotification (`a new blog: ${title} by: ${author} was created!`)
        setTimeout(()=>{
          setNotification(null)
        }, 3000)
  
    }


    return (
        <div>
          <h2>create new</h2>
          <form onSubmit={createBlog}>
            <div>
              <input
                type="text"
                value={title}
                name="Title"
                placeholder="Title"
                onChange={({target})=> setTitle(target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                value={author}
                name="Author"
                placeholder="Author"
                onChange={({target})=> setAuthor(target.value)}
              />
            </div>
            <div>
              <input
              type="text"
              value={url}
              name="Url"
              placeholder="Url"
              onChange={({target})=> setUrl(target.value)}
            />
            </div>
            <button type="submit">Create</button>
          
          </form>
        </div>
    )
}

export default CreateNewBlog