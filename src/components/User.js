import React from 'react'
import {
  useParams
} from "react-router-dom"
import { initializeUsers } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'

const User = ({users}) => {
  const dispatch = useDispatch()
  dispatch(initializeUsers())
  
  const id = useParams().id
  console.log(id)
  console.log(users)
  const user = users.find(user => user.id === id)
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h1>added blogs</h1>
      <ul>
      {user.blogs.map(blog =>
        <li key={blog.id}>
          <div>{blog.title}</div>
        </li>
      )}
    </ul>
    </div>
  )
}

export default User