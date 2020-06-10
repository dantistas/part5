import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewBlog from './components/createblog'
import Togglable from "./components/toggle"


const Notification = ({message}) => {
  if(message === null ) {
    return null
  }else {
    return (
      <div className="notification">
        {message}
      </div>
    )
  }
}

const ErrorNotification = ({error}) => {
  if(error === null ) {
    return null
  }else {
    return (
      <div className="error">
        {error}
      </div>
    )
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  //login
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

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
      setErrorMessage ('wrong username or password')
      setTimeout(()=>{
        setErrorMessage(null)
      }, 3000)
    }
  }
  

  const loginForm = () => {
    return (
        <div>
            <ErrorNotification error={errorMessage} />
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

const blogForm = () => {
  return (
    <Togglable buttonLabel="Create new Blog">
        <CreateNewBlog
        setNotification={setNotification}
        user={user}
        setBlogs={setBlogs}
        blogs={blogs}
      />
    </Togglable>
      
  )
      
 
}
const logOut = ()=>{
  window.localStorage.clear()
  window.location.reload()
  
}


  return (
    <div>
      <Notification message={notification} />
      <ErrorNotification error={errorMessage} />
      <h2>blogs</h2>
      {user === null ?
        loginForm() :
        <div>
          <p>Logged in as {user.name}</p>
          <button onClick={logOut}>log out</button>
          {blogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
        
      }
       
    </div>
  )
}


export default App