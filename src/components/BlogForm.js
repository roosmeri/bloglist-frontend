import React from 'react'

const BlogForm = ({ onSubmit,
    newBlogTitle,
    newBlogAuthor,
    newBlogUrl,
    handleBlogTitleChange,
    handleBlogAuthorChange,
    handleBlogUrlChange,
    toggleVisibility
}) => {
    return (
        <form onSubmit={onSubmit}>
            <div>title: <input value={newBlogTitle} onChange={handleBlogTitleChange} /></div>
            <div>author: <input value={newBlogAuthor} onChange={handleBlogAuthorChange} /></div>
            <div>url: <input value={newBlogUrl} onChange={handleBlogUrlChange} /></div>
            <div>
                <button onClick={toggleVisibility} type="submit">save</button>
            </div>
        </form>
    )
}

export default BlogForm