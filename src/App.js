import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { createNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logout } from './reducers/loginReducer'



const App = () => {
  const blogs = useSelector(state => {
    return state.blogs
  })
  const user = useSelector(state => {
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
          <Blog key={blog.id} user={user} blog={blog} likeBlog={likeBlog} deleteBlog={deleteBlog} />
        )}
      </div>)
  }

  const deleteBlog = async (id) => {
    try {
      await blogService.remove(id)
      dispatch(deleteBlog(id))
      dispatch(createNotification('Removed blog successfully.', 5))
    } catch (error) {
      console.log(error)
      dispatch(createNotification('Could not remove blog.', 5))
    }
  }

  const likeBlog = async (id, blogObject) => {
    try {
      dispatch(likeBlog(id,blogObject))
      dispatch(createNotification(`Successfully liked blog: ${blogObject.title} by ${blogObject.author}`))
    } catch (error) {
      dispatch(createNotification('Could not like blog.'))
    }
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
        </div>
      }
    </div>
  )
}

export default App