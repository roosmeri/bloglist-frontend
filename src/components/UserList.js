import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { initializeUsers } from '../reducers/userReducer'

const UserList = () => {
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <table>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
          <tr key={user.id}>
            <td>
              {user.name}
            </td>
            <td>
              {user.blogs.length}
            </td>
          </tr>)}
      </tbody>
    </table>
  )
}
export default UserList