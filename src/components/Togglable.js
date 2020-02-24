import React from 'react'
import PropTypes from 'prop-types'

const Togglable = ({
  hideWhenVisible,
  toggleVisibility,
  showWhenVisible,
  buttonLabel,
  children
}) => {
  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>

  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable