import { useState } from 'react'

const Blog = ({ blog , functionLike, deletefunction, user }) => {
  // console.log("blog in blog.js  component: ", blog)
  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [show, setShow] = useState(false)

  const showHide = () => {
    setShow(!show)
  }
  if(show){
    return (
      <div style={blogStyle}>
        <div className='visibleContent'>
          <button onClick={showHide} className="visibleBtn"> hide </button>
          <p className='title'>{blog.title}</p>
          <p className='author'>{blog.author}</p>
        </div>
        <div className='togglableContent'>
          <p className='url'>{blog.url}</p>
          <p className='likes'> likes {blog.likes}</p> <button className='likeBtn' onClick={() => functionLike(blog.id)}> like </button>
          { user === blog.user.username ? <button className='deleteBtn' onClick={() => deletefunction(blog.id)}> delete </button>  : null}
        </div>
      </div>
    )
  }
  return (
    <div className='visibleContent' style={blogStyle}>

      <p className='title'>{blog.title} <button onClick={showHide} className="visibleBtn"> show </button></p>
      <p className='author'>{blog.author}</p>
    </div>
  )
}

export default Blog