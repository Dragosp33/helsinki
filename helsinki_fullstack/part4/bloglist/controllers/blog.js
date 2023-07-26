const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/users')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')
const userExtractor = middleware.userExtractor

blogsRouter.get('/', async (request, response) => {
  const Blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  // console.log(Blogs)
  response.json(Blogs)
})


blogsRouter.post('/', userExtractor, async (request, response) => {
  // const user = await User.findOne()
  const body = request.body
  console.log('????')
  console.log(request.token)
  // const body = request.body
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // console.log(decodedToken)
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

  // console.log('blog.title: ', blogObject.title)
  // console.log('inainte sa intre in if ', blog)
  // console.log('ARE?????,', Object.hasOwn(blogObject, 'title'))4
  if (!Object.hasOwn(blogObject, 'title') ||
  !Object.hasOwn(blogObject, 'url') ) {
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
    response.status(201).json(savedBlog)
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
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  console.log(decodedToken)
  const user = await User.findById(decodedToken.id)
  const blog = await Blog.findById(request.params.id)
  if ( blog.user.toString() === user._id.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(403).send({
      message: '403: Forbidden',
    })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  let oldBody = await Blog.findById(id)
  if (oldBody === null) {
    response.status(404).send( {
      message: 'cant find the blog',
    })
  }
  oldBody = oldBody.toObject()
  const newBody = { ...oldBody, likes: request.body.likes }
  console.log(newBody)
  // const newBody = {...}
  await Blog.findByIdAndUpdate(id, newBody,
    { new: true, runValidators: true, context: 'query' })
  response.status(202).json(newBody)
})

module.exports = blogsRouter
