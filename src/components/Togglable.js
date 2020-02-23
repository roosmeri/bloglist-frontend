import React from 'react'

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

export default Togglable