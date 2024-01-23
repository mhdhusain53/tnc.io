import { createSlice } from '@reduxjs/toolkit'

const initialState = {
user: null,
userId: null,
token: localStorage.getItem('token'),
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
     console.log(action.payload, 'action.payload');

     state.userId = action.payload.userId
     state.user = action.payload.user
     state.localStorage = action.payload.accessToken
     localStorage.setItem('token', action.payload.accessToken)
    },
    logout: (state, {payload}) => {
      console.log(payload, 'payload');
      state.localStorage = null
      state.user = null
      localStorage.removeItem('token')

    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer