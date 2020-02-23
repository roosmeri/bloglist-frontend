import React, { useState } from 'react'

const Blog = ({ blog, likeBlog }) => {
    const [showAll, setShowAll] = useState(false)

    const toggleView = () => {
        setShowAll(!showAll)
    }

    const shortView = () => {
        return (<div>{blog.title} {blog.author}</div>)
    }

    const allView = () => {
        return (
            <div>
                <div>{blog.title} {blog.author}</div>
                <div>{blog.url}</div>
                <div>{blog.likes}<button onClick={like}>like</button></div>
            </div>
        )
    }

    const like = (event) => {
        const blogObject = {
            user: blog.user.id,
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: blog.likes + 1
        }
        
        likeBlog(blog.id,blogObject)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    return (<div style={blogStyle}>
        {showAll ?
            allView()
            :
            shortView()
        }
        {showAll ?
            <button onClick={toggleView}>hide</button>
            :
            <button onClick={toggleView}>view</button>
        }
    </div>)

}

export default Blog