import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Error from './components/Error'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs.sort(function (a, b) { return b.likes - a.likes }))
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
      doErroring('Incorrect credentials.')
    }
  }


  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const blogsDiv = () => {
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} user={user} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
        )}
      </div>)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    try {
      const returned = await blogService.create(blogObject)
      setBlogs(blogs
        .concat(returned)
        .sort(function (a, b) { return b.likes - a.likes }))
      doMessaging(`Successfully added new blog: ${blogObject.title} by ${blogObject.author}`)
    } catch (error) {
      console.log(error)
      doErroring('Could not add new blog.')
    }
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => id.toString() !== blog.id.toString()))
      doMessaging('Removed blog successfully.')
    } catch (error) {
      console.log(error)
      doErroring('Could not remove blog.')
    }
  }

  const likeBlog = async (id, blogObject) => {
    try {
      await blogService.update(id, blogObject)
      doMessaging(`Successfully liked blog: ${blogObject.title} by ${blogObject.author}`)
      const allBlogs = await blogService.getAll()
      setBlogs(allBlogs.sort(function (a, b) { return b.likes - a.likes }))
    } catch (error) {
      doErroring('Could not like blog.')
    }
  }

  return (
    <div>
      <Notification message={message} />
      <Error message={errorMessage} />
      {user === null ?
        <LoginForm handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange} />
        :
        <div>
          <h2>blogs</h2>

          <Togglable
            buttonLabel='new blog'
            toggleVisibility={toggleVisibility}
            hideWhenVisible={hideWhenVisible}
            showWhenVisible={showWhenVisible}
          >
            <h2>create new</h2>
            <BlogForm createBlog={createBlog}
              toggleVisibility={toggleVisibility} />
          </Togglable>
          <p>{user.name} logged in <button onClick={handleLogout}>Logout</button></p>
          {blogsDiv()}
        </div>
      }
    </div>
  )
}

export default App