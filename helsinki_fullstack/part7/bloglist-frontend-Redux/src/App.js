import { useState, useEffect, useRef } from 'react'
// components:
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import ShowBlogs from './components/ShowBlogs'
import BlogForm from './components/AddBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import SingleUser from './components/SingleUser'
import Blog from './components/Blog'
import Menu from './components/Menu'
import MenuTest from './components/menuTest'

//reducers:
import { fetchUsers } from './reducers/usersReducer'
import { setNotification } from './reducers/notificationReducer'
import { postBlog, initializeBlogs } from './reducers/blogsReducer'
import { loginUser, removeUser, setUser } from './reducers/loginReducer'
import { initialMode } from './reducers/darkmodeReducer'

// react imports:
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'
//botstrap:
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const user = useSelector((state) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    const theme = window.localStorage.getItem('mode')
    if (theme) {
      dispatch(initialMode(theme))
    }
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    console.log(loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    } else {
      dispatch(removeUser())
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(fetchUsers())
    console.log('triggered useEffect')
  }, [dispatch])
  const blogs = useSelector((state) => state.blogs)
  const users = useSelector((state) => state.userlist)
  // const blogs = useSelector((state) => state.blogs)
  console.log('users:', users)
  console.log('user:', user)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const [user, setUser] = useState(null)

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handlePostBlog = async (blogObject) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      try {
        BlogToggleFormRef.current.toggleVisibility()
        const k = JSON.parse(loggedUserJSON)
        const newBlog = {
          title: blogObject.title,
          author: blogObject.author,
          url: blogObject.url,
          user: k.id,
        }
        dispatch(postBlog(newBlog))
        dispatch(
          setNotification(
            `a new blog ${newBlog.title} by ${newBlog.author} added`,
          ),
        )
      } catch (exception) {
        console.log(exception)
        dispatch(setNotification('error', 'Could not add the blog'))
      }
    }
  }

  const BlogToggleFormRef = useRef()

  const BlogToggleForm = () => (
    <Togglable buttonLabel="new blog" ref={BlogToggleFormRef}>
      <BlogForm handleSubmit={handlePostBlog} />
    </Togglable>
  )

  const handleLogout = async () => {
    console.log('s a apasat logout')
    // event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(removeUser())
    // setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      dispatch(
        loginUser({
          username,
          password,
        }),
      )
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
      dispatch(setNotification('error', 'wrong credentials'))
    }
  }

  const match = useMatch('/users/:id')
  if (match) {
    console.log('match???', match)
  }
  const userPage = match
    ? users.find((useritem) => useritem.id === match.params.id)
    : null

  const blogMatch = useMatch('/blogs/:id')
  console.log(blogMatch)
  const blogPage = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  return (
    <>
      <Notification />

      {user === null ? (
        <>
          <p> login to see the blogs </p>

          <LoginForm
            handleLogin={handleLogin}
            username={username}
            handleUsernameChange={handleUsernameChange}
            password={password}
            handlePasswordChange={handlePasswordChange}
          />
        </>
      ) : (
        <>
          <Menu username={user.username} handleLogout={handleLogout} />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ShowBlogs />
                  <BlogToggleForm />
                </>
              }
            />

            <Route path="/users" element={<Users />} />
            <Route
              path="/users/:id"
              element={<SingleUser userPage={userPage} />}
            />
            <Route path="/blogs/:id" element={<Blog blog={blogPage} />} />
          </Routes>
        </>
      )}
    </>
  )
}

export default App
