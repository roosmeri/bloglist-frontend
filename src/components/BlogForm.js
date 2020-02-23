import React, { useState } from 'react'

const BlogForm = ({
    createBlog,
    toggleVisibility
}) => {
    const [newBlogTitle, setNewBlogTitle] = useState('')
    const [newBlogAuthor, setNewBlogAuthor] = useState('')
    const [newBlogUrl, setNewBlogUrl] = useState('')

    const handleBlogTitleChange = (event) => {
        setNewBlogTitle(event.target.value)
    }
    const handleBlogAuthorChange = (event) => {
        setNewBlogAuthor(event.target.value)
    }
    const handleBlogUrlChange = (event) => {
        setNewBlogUrl(event.target.value)
    }

    const addBlog = async (event) => {
        event.preventDefault()
        const blogObject = {
            title: newBlogTitle,
            author: newBlogAuthor,
            url: newBlogUrl
        }
        createBlog(blogObject)

        setNewBlogAuthor('')
        setNewBlogTitle('')
        setNewBlogUrl('')
    }

    return (
        <form onSubmit={addBlog}>
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