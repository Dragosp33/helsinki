import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
// import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import ShowBlogs from './components/ShowBlogs'
import BlogForm from './components/AddBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
// import Blog from './components/Blog'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [updateKey, setUpdateKey] = useState(0)


  const [message, setMessage] = useState('')
  const [notificationVisible, setNotificationVisible] = useState(false)
  const [messageType, setMessageType] = useState('notification')

  const likeBlog = async (id) => {
    try {
      // const fblog = blogs.find(n => n.id === id)
      const response = await blogService.likeBlog(id)
      const changedblog = response
      console.log('blog updated: ', changedblog)
      setBlogs(blogs.map(n => n.id !== changedblog._id ? n : changedblog))
      setUpdateKey(prevkey => prevkey+1)
      changeNotification('notification', `blog ${changedblog.title} liked`)

    // console.log(blogs)
    }
    catch (exception) { changeNotification('error', 'something went wrong')}

  }

  const deleteBlog = async (id) => {
    try {
      const fblog = blogs.find(n => n.id === id)
      if (window.confirm(`Do you really want to delete the blog ${fblog.title} ?`) ) {
        const response = await blogService.deleteBlog(id)
        // const changedblog = response
        console.log('response delete: ', response)

        setBlogs(blogs.filter(n => n.id !== id))
        setUpdateKey(prevkey => prevkey+1)
        changeNotification('notification', `blog ${fblog.title} liked`)

        // console.log(blogs)
      }
    }
    catch (exception) { changeNotification('error', 'something went wrong')}

  }

  useEffect(() => {

    async function fetchData() {
      try {
        const blogsinDB = await blogService.getAll()
        // (a, b) => a.value - b.value
        setBlogs(blogsinDB.sort((a, b) => b.likes - a.likes))

      } catch (exception) {
        console.log('error in fetchdata')
      }
    }

    fetchData()
  }, [updateKey])
  console.log('fetched data: ', blogs)

  const changeNotification = (type, message) => {
    // console.log(type, message)
    setMessage(message)
    setMessageType(type)
    setNotificationVisible(true)

    // After adding data, you can decide when to hide the notification
    // For example, you can hide it after a certain time or after a specific event occurs
    setTimeout(() => {
      setNotificationVisible(false)
    }, 3000)

  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


  const handlePostBlog = async (blogObject) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON){
      try {
        BlogToggleFormRef.current.toggleVisibility()
        const k = JSON.parse(loggedUserJSON)
        const newBlog = {
          title: blogObject.title,
          author: blogObject.author,
          url: blogObject.url,
          user: k.id
        }
        const response = await blogService.create(newBlog)
        setBlogs(blogs.concat(response))
        changeNotification('notification', `a new blog ${response.title} by ${response.author} added`)
      }
      catch (exception){ console.log(exception)
        changeNotification('error', 'Could not add the blog')}
    }

  }

  const BlogToggleFormRef = useRef()

  const BlogToggleForm = () => (
    <Togglable buttonLabel='new blog' ref={BlogToggleFormRef}>
      <BlogForm handleSubmit={handlePostBlog} />
    </Togglable>
  )

  const handleLogout = async () => {
    console.log('s a apasat logout')
    // event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('wrong credentials')
      changeNotification('error', 'wrong credentials')
    }
  }



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    else {
      setUser(null)
    }
  }, [])

  // console.log("user:", user)

  return (

    <div>

      <Notification message={message} visible={notificationVisible}
        onHide={() => setNotificationVisible(false)} className={messageType}/>

      {user === null ?
        <>
          <p> login to see the blogs </p>

          <LoginForm handleLogin={handleLogin} username={username} handleUsernameChange={handleUsernameChange}
            password={password} handlePasswordChange={handlePasswordChange}/></> :
        <>
          <h2>blogs</h2>
          <ShowBlogs blogs={blogs} user={user.username} handleLogout={handleLogout} functionLike={likeBlog}
            deletefunction={deleteBlog} updateKey={updateKey}/>
          <BlogToggleForm />
        </> }

    </div>
  )
}

export default App