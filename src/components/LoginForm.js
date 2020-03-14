
import React from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../reducers/loginReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const onSubmit = (event) => {
    event.preventDefault()
    dispatch(login(event.target.Username.value, event.target.Password.value))
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username
        <input
            id='username'
            type="text"
            name="Username"
          />
        </div>
        <div>
          password
        <input
            id='password'
            type="password"
            name="Password"
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )
}


export default LoginForm