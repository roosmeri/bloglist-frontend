import React from 'react'
import {
  createBlog
} from '../reducers/blogReducer'
import {
  createNotification
} from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import { initializeUsers } from '../reducers/userReducer'

const BlogForm = ({
  toggleVisibility
}) => {
  const dispatch = useDispatch()

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.author.value = ''
    dispatch(createBlog(blogObject))
  }

  return (
    <form onSubmit={addBlog}>
      <div>title: <input name='title' /></div>
      <div>author: <input name='author' /></div>
      <div>url: <input name='url' /></div>
      <button id='submit' onClick={toggleVisibility} type="submit">create</button>
    </form>
  )
}

export default BlogForm