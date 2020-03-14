import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logout } from './reducers/loginReducer'
import blogService from './services/blogs'
import { initializeUsers } from './reducers/userReducer'
import UserList from './components/UserList'


const App = () => {
  const blogs = useSelector(state => {
    return state.blogs
  })
  const user = useSelector(state => {
    blogService.setToken(state.user.token)
    return state.user
  })
  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogsDiv = () => {
    return (
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} user={user} blog={blog} />
        )}
      </div>)
  }

  return (
    <div>
      <Notification />
      {user === null ?
        <LoginForm />
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
            <BlogForm toggleVisibility={toggleVisibility} />
          </Togglable>
          <p>{user.name} logged in <button onClick={() => dispatch(logout())}>Logout</button></p>
          {blogsDiv()}
          <h2>Users</h2>
          <UserList />
        </div>
      }
    </div>
  )
}

export default App