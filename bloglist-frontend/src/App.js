import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(`logging with username: ${username} password: ${password}`)
    try{
      const user = await loginService.login({
        username,password,
      })
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

  return (
    <div>
      <h2>blogs</h2>
      <p>logged in as {user.name} </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


export default App