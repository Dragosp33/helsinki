import loginService from '../services/login'
import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    },
  },
})

export const { setUser, removeUser } = loginSlice.actions

export const loginUser = (credentials) => {
  return async (dispatch) => {
    try {
      const loginData = await loginService.login(credentials)
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loginData),
      )
      blogService.setToken(loginData.token)
      dispatch(setUser(loginData))
    } catch (exception) {
      removeUser()
      console.log('error ', exception)
    }
  }
}

export default loginSlice.reducer
