import blogService from '../services/blogs'
import { createSlice } from '@reduxjs/toolkit'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      state.push(action.payload)
    },

    appendBlog(state, action) {
      state.push(action.payload)
    },

    setBlogs(state, action) {
      return action.payload
    },

    popBlog(state, action) {
      const id = action.payload
      console.log('id in popblog: ', id)
      return state.filter((n) => n.id !== id)
      //setBlogs(blogs.filter((n) => n.id !== id))
    },

    changeBlog(state, action) {
      const id = action.payload.id

      return state.map((blog) => (blog.id !== id ? blog : action.payload))
    },
  },
})

export const { setBlogs, appendBlog, changeBlog, createBlog, popBlog } =
  blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
  }
}

export const postBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeBlog = (id) => {
  return async (dispatch) => {
    const votedBlog = await blogService.likeBlog(id)

    dispatch(changeBlog(votedBlog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const deleted = await blogService.deleteBlog(id)
    dispatch(popBlog(id))
  }
}

export default blogSlice.reducer
