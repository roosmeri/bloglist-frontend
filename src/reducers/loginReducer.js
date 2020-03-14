import loginService from '../services/login'
import blogService from '../services/blogs'
import { createNotification } from './notificationReducer'
import storage from '../utils/storage'

const loginReducer = (state = storage.loadUser(), action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'LOGIN':
      return action.data
    case 'LOGOUT':
      return null
    default:
      return state
  }
}

export const login = (username, password) => {
  return async dispatch => {
    console.log('tryna login with', username)
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      storage.saveUser(user)
      dispatch({
        type: 'LOGIN',
        data: user
      })
    } catch (error) {
      dispatch(createNotification('Incorrect credentials.', 5))
    }

  }
}


export const logout = () => {
  return dispatch => {
    blogService.setToken(null)
    storage.logoutUser()
    dispatch({
      type: 'LOGOUT'
    })
  }
}

export default loginReducer