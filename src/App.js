import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route
} from "react-router-dom"
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import User from './components/User'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { logout } from './reducers/loginReducer'
import blogService from './services/blogs'
import UserList from './components/UserList'
import { initializeUsers } from './reducers/userReducer'


const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => {
    blogService.setToken(state.user.token)
    return state.user
  })

  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()

  const users = useSelector(state => state.users)
  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

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
    <Router>
      <div>
        <Notification />
        <Switch>
          <Route path="/users/:id">
            <User users={users} />
          </Route>
          <Route path="/">
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
                <p>{user.name} logged in
                <button onClick={() => dispatch(logout())}>Logout</button>
                </p>
                {blogsDiv()}
                <h2>Users</h2>
                <UserList users={users}/>
              </div>
            }
          </Route>
        </Switch>

      </div>
    </Router>
  )
}

export default App