import Blog from './Blog'
import { useEffect } from 'react'

const ShowBlogs = ({ blogs, user, handleLogout, functionLike, deletefunction, updateKey }) => {

  useEffect(() => {
    console.log('Updated blogs in ShowBlogs:', blogs)
  }, [blogs, updateKey])
  console.log('??????', blogs, user)

  return (
    <>
      <p> User logged in {user} </p> <button onClickCapture={handleLogout}> Log Out</button>
      <div>
        { blogs.map(blog =>
          <Blog key={blog.id} blog={blog} functionLike={functionLike} deletefunction={deletefunction} user={user}/>) }
      </div>
    </>
  )
}

export default ShowBlogs