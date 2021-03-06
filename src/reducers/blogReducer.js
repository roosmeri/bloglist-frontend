import blogService from '../services/blogs'
import { initializeUsers } from './userReducer'
import { createNotification } from './notificationReducer'

const sort = (state) => {
  return state
    .sort(
      (a, b) =>
        (a.likes < b.likes) ?
          1
          :
          ((b.likes < a.likes) ?
            -1
            :
            0)
    )
}

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT_BLOGS':
      return sort(action.data)
    case 'NEW_BLOG':
      return sort([...state, action.data])
    case 'DELETE':
      return sort(action.data)
    case 'LIKE':
      return sort(action.data)
    default:
      return state
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
    dispatch(initializeUsers())
    dispatch(createNotification('Well created',5))
  }
}


export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'DELETE',
      data: blogs
    })
    dispatch(initializeUsers())
    dispatch(createNotification('Deleted',5))
  }
}

export const likeBlog = (id, oldObject) => {
  return async dispatch => {
    const newObject = {
      id: id,
      title: oldObject.title,
      author: oldObject.author,
      url: oldObject.url,
      likes: oldObject.likes + 1
    }
    await blogService.update(id, newObject)
    const blogs = await blogService.getAll()
    dispatch({
      type: 'LIKE',
      data: blogs
    })
  }
}


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }

}

export default blogReducer