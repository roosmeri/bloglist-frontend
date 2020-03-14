import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { initializeUsers } from '../reducers/userReducer'

const Blog = ({ user, blog }) => {
  const [showAll, setShowAll] = useState(false)
  const dispatch = useDispatch()

  const toggleView = () => {
    setShowAll(!showAll)    
  }

  const shortView = () => {
    return (<div>{blog.title} {blog.author}</div>)
  }

  const allView = () => {
    return (
      <div>
        <div>{blog.title} {blog.author}</div>
        <div>{blog.url}</div>
        <div>{blog.likes}<button onClick={like}>like</button></div>
        {user.username === blog.user.username ? <div>
          <button onClick={remove}>remove</button>
        </div> : <div></div>}
      </div>
    )
  }

  const like = (event) => {
    dispatch(likeBlog(blog.id, blog))
  }

  const remove = (event) => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    dispatch(deleteBlog(blog.id))
    dispatch(initializeUsers())
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (<div className='blog' style={blogStyle}>
    {showAll ?
      allView()
      :
      shortView()
    }
    {showAll ?
      <button onClick={toggleView}>hide</button>
      :
      <button onClick={toggleView}>view</button>
    }
  </div>)

}

export default Blog