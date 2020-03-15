import React from 'react'
import {
  Link
} from "react-router-dom"

const UserList = ({users}) => {

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
              <Link to={`/users/${user.id}`}>{user.name}</Link>
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