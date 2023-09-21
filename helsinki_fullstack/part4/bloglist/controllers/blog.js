const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')
const Comments = require('../models/comments')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const userExtractor = middleware.userExtractor

blogsRouter.get('/', async (request, response) => {
  const Blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  // console.log(Blogs)
  response.json(Blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  console.log(request.token)

  const user = request.user
  console.log('User in controllers.blogs: ', user)
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id,
  })
  console.log('blog in controllers blog:', blog)
  const blogObject = blog.toObject()

  if (
    !Object.hasOwn(blogObject, 'title') ||
    !Object.hasOwn(blogObject, 'url') ||
    blogObject.title === '' ||
    blogObject.url === ''
  ) {
    response.status(400).send({ message: 'Blog should have a title and url' })
  } else {
    if (!Object.hasOwn(blogObject, 'likes')) {
      // console.log('blogul nu are likes', blog)
      blog.likes = 0
    }

    console.log('Blog la final dupa toate ifurile: ', blog)
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    const k2 = await savedBlog.populate('user', { username: 1, name: 1 })
    response.status(201).json(k2)
  }
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const reqUser = request.user
  // console.log(`user in request: ${reqUser}`)
  const user = await User.findById(reqUser)
  // console.log(`user.findbyid: ${user._id}`)
  const blog = await Blog.findById(request.params.id)
  // console.log(`blog.user.tostring: ${blog.user.toString()}`)
  if (blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    user.blogs.filter((n) => n.id !== request.params.id)
    response.status(204).end()
  } else {
    response.status(403).send({
      message: '403: Forbidden',
    })
  }
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const id = request.params.id
  const oldBody = await Blog.findById(id)
  if (oldBody === null) {
    response.status(404).send({
      message: 'cant find the blog',
    })
  } else if (user) {
    const blog = {
      title: oldBody.title,
      author: oldBody.author,
      url: oldBody.url,
      likes: oldBody.likes + 1,
      user: oldBody.user,
    }
    // const newBody = {...}
    console.log(blog)
    const responseBlog = await Blog.findByIdAndUpdate(id, blog, {
      new: true,
      runValidators: true,
      context: 'query',
    })
    const k2 = await responseBlog.populate('user', { username: 1, name: 1 })
    console.log(k2)
    response.status(202).json(k2)
  } else {
    response.status(403).send({
      message: '403: Forbidden',
    })
  }
})

blogsRouter.get('/:id/comments', userExtractor, async (request, response) => {
  console.log('???')
  const user = request.user
  const id = request.params.id
  if (user) {
    const comments = await Comments.find({ blog: id })
    return response.status(200).json(comments)
  }
  return response.status(403).send({
    message: '403: Forbidden',
  })
})

blogsRouter.post('/:id/comments', userExtractor, async (request, response) => {
  console.log('????????')
  const user = request.user
  const id = request.params.id
  const body = request.body
  console.log(body)
  const blog = await Blog.findById(id)
  if (user) {
    const postBody = new Comments({
      content: body.content,
      blog: blog.id,
    })
    const savedComment = await postBody.save()
    return response.status(200).json(savedComment)
  }
  return response.status(403).send({
    message: '403: Forbidden',
  })
})

module.exports = blogsRouter
