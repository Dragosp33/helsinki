import { useState } from 'react'

const BlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const addBlog = (event) => {
    event.preventDefault()
    handleSubmit({
      title: title,
      author: author,
      url: url
    })

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>

      <div>
      title: <input id="blog-title" value={title}
          onChange={event => setTitle(event.target.value)} />

      </div>
      <div>
      author: <input id="blog-author" value={author}
          onChange={event => setAuthor(event.target.value)} />

      </div>
      <div>
      url: <input id="blog-url" value={url}
          onChange={event => setUrl(event.target.value)} />

      </div>

      <div>
        <button type="submit">Add blog</button>
      </div>
    </form>
  )

}
export default BlogForm