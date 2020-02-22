import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const doMessaging = (text) => {
    setMessage(text)
    setTimeout(() => {
      setMessage(null)
    }, 1000)
  }

  const doErroring = (text) => {
    setErrorMessage(text)
    setTimeout(() => {
      setErrorMessage(null)
    }, 1000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      console.log('fail')
      doErroring(`Incorrect credentials.`)
    }
  }


  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }

    try {
      const returned = await blogService.create(blogObject)
      setBlogs(blogs.concat(returned))
      doMessaging(`Successfully added new blog: ${blogObject.title} by ${blogObject.author}`)
      setNewBlogAuthor('')
      setNewBlogTitle('')
      setNewBlogUrl('')
    } catch (error) {
      console.log('fail')
      doErroring(`Could not add new blog.`)
    }

  }


  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }
  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  const handleBlogUrlChange = (event) => {
    setNewBlogUrl(event.target.value)
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>title: <input value={newBlogTitle} onChange={handleBlogTitleChange} /></div>
      <div>author: <input value={newBlogAuthor} onChange={handleBlogAuthorChange} /></div>
      <div>url: <input value={newBlogUrl} onChange={handleBlogUrlChange} /></div>
      <div><button type="submit">save</button></div>
    </form>
  )

  const blogsDiv = () => {
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  return (
    <div>
      <Notification message={message} />
      <Error message={errorMessage} />
      {user === null ?
        <LoginForm handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword} /> :
        <div>
          <h2>blogs</h2>
          <h2>create new</h2>
          {blogForm()}
          <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
          {blogsDiv()}
        </div>
      }
    </div>
  )
}

export default App