import React, { useState } from 'react'

const Blog = ({ user, blog, likeBlog, deleteBlog }) => {
  const [showAll, setShowAll] = useState(false)

  const toggleView = () => {
    setShowAll(!showAll)
  }

  const shortView = () => {
    return (<div>{blog.title} {blog.author}</div>)
  }

  const removeButton = () => {
    if (user.username === blog.user.username) {
      return (
        <div>
          <button onClick={remove}>remove</button>
        </div>
      )
    }
  }

  const allView = () => {
    return (
      <div>
        <div>{blog.title} {blog.author}</div>
        <div>{blog.url}</div>
        <div>{blog.likes}<button onClick={like}>like</button></div>
        {removeButton()}
      </div>
    )
  }

  const like = (event) => {
    const blogObject = {
      user: blog.user.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }

    likeBlog(blog.id, blogObject)
  }

  const remove = (event) => {
    window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)

    deleteBlog(blog.id)
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