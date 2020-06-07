import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  //login
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  //blog form
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(()=>{
    const loggedUserJson = window.localStorage.getItem('loggedUser') 
    if(loggedUserJson){
      const user = JSON.parse(loggedUserJson)
      setUser(user)
    }
  },[])
  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(`logging with username: ${username} password: ${password}`)
    try{
      const user = await loginService.login({
        username,password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(exception){
      setErrorMessage ('wrong credentials')
      setTimeout(()=>{
        setErrorMessage(null)
      }, 5000)
    }
  }
  const createBlog = async (e) => {
    e.preventDefault()
    blogService.setToken(user.token)
    const returnedBlogs = await blogService.create({title, author, url,})
    setTitle('')
    setAuthor('')
    setUrl('')
    setBlogs(blogs.concat(returnedBlogs))

  }
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            <input 
            type="text"
            value={username}
            name="Username"
            placeholder="Username"
            onChange={({target})=> setUsername(target.value)}
            />
          </div>
          <div>
            <input 
            type="password"
            value={password}
            name="password"
            placeholder="Password"
            onChange={({target})=> setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
      </form>
      </div>
    )
  }
const logOut = ()=>{
  window.localStorage.clear()
  window.location.reload()
  
}
  return (
    <div>
      <h2>blogs</h2>
      <p>logged in as {user.name} </p>
      <button onClick={logOut}>log out</button>
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App