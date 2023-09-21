import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { initializeBlogs } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'

const ShowBlogs = ({ user = null }) => {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
    //setTimeout(() => setLoading(false))
    setLoading(false)
  }, [dispatch])

  let stateBlogs = useSelector((state) => state.blogs)
  if (user !== null) {
    stateBlogs = stateBlogs.filter((n) => n.user.id === user.id)
  }
  if (loading) {
    return <div>loading data..</div>
  }
  console.log('user: ', user)
  console.log(`blogs: `, stateBlogs)

  return (
    <>
      <div className="container">
        {user ? <p> blogs by user {user.username}</p> : null}
        {stateBlogs.map((blog) => (
          <div key={blog.id}>
            <Link to={`/blogs/${blog.id}`}> {blog.title} </Link>
          </div>
        ))}
      </div>
    </>
  )
}

export default ShowBlogs
