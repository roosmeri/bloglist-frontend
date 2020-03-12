const initialNotification = ''

let timeout = null

const notificationReducer = (state = initialNotification, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data.message
    case 'DELETE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export const createNotification = (message, time) => {
  return async dispatch => {
    timeout = setTimeout(() => {
      clearTimeout(timeout)
      dispatch(deleteNotification())
    }, time * 1000)
    dispatch({
      type: 'NEW_NOTIFICATION',
      data: {
        message: message
      }
    })
  }
}


export const deleteNotification = () => {
  return {
    type: 'DELETE_NOTIFICATION',
  }
}

export default notificationReducer