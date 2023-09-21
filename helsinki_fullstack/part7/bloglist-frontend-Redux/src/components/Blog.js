import Comments from './Comments'

import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  const blogStyle = {
    paddingTop: 5,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const likefunction = async (blog) => {
    console.log('blog at first in like function: ', blog)
    dispatch(likeBlog(blog.id))

    dispatch(setNotification(`voted for ${blog.title}`))
  }

  const deleteFunction = async (blog) => {
    try {
      if (
        window.confirm(`Do you really want to delete the blog ${blog.title} ?`)
      ) {
        dispatch(deleteBlog(blog.id))
        dispatch(setNotification(`deleted blog ${blog.title}`))
      }
    } catch (exception) {
      dispatch(setNotification('something went wrong.'))
      console.log(exception)
    }
  }

  const [show, setShow] = useState(false)

  const showHide = () => {
    setShow(!show)
  }
  if (show) {
    return (
      <div style={blogStyle}>
        <div className="visibleContent">
          <button onClick={showHide} className="visibleBtn">
            {' '}
            hide{' '}
          </button>
          <p className="title">{blog.title}</p>
          <p className="author">{blog.author}</p>
        </div>
        <div className="togglableContent">
          <p className="url">{blog.url}</p>
          <p className="likes"> likes {blog.likes}</p>{' '}
          <button className="likeBtn" onClick={() => likefunction(blog)}>
            {' '}
            like{' '}
          </button>
          {user.username === blog.user.username ? (
            <button className="deleteBtn" onClick={() => deleteFunction(blog)}>
              {' '}
              delete{' '}
            </button>
          ) : null}
        </div>
        <Comments id={blog.id} />
      </div>
    )
  }
  return (
    <div className="visibleContent" style={blogStyle}>
      <p className="title">
        {blog.title}{' '}
        <button onClick={showHide} className="visibleBtn">
          {' '}
          show{' '}
        </button>
      </p>
      <p className="author">{blog.author}</p>
    </div>
  )
}

export default Blog
