import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

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
    } catch (exception) {
      console.log('issues')
    }
  }


  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = { title: newBlogTitle, 
      author: newBlogAuthor, 
      url: newBlogUrl
    }

    blogService
      .create(blogObject)
      .then(returned => {
        setBlogs(blogs.concat(returned))
        setNewBlogAuthor('')
        setNewBlogTitle('')
        setNewBlogUrl('')
      })
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
      <div>title: <input value={newBlogTitle} onChange={handleBlogTitleChange}  /></div>
      <div>author: <input value={newBlogAuthor} onChange={handleBlogAuthorChange}/></div>
      <div>url: <input value={newBlogUrl} onChange={handleBlogUrlChange}/></div>
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

      {user === null ?
        <LoginForm handleLogin={handleLogin} 
        username={username} 
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}/> :
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