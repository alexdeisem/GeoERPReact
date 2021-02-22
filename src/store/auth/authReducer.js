import axios from 'axios';
import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT, AUTH_SET_USER } from './authTypes';

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') || false,
  isAdmin: localStorage.getItem('isAdmin') || false,
  token: localStorage.getItem('token') || '',
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {},
}

if (initialState.token) {
  axios.defaults.headers.common = {'Authorization': `Bearer ${initialState.token}`};
}

export default function(state=initialState, action) {
  switch(action.type) {
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isAdmin: action.payload.user.isAdmin,
        token: action.payload.token,
        user: {...action.payload.user}
      }
        
    case AUTH_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
        token: '',
        user: {}
      }

    case AUTH_SET_USER:
      return {
        ...state,
        isLoggedIn: true,
        isAdmin: action.payload.isAdmin,
        user: {...action.payload}
      }
      
    default: return state
  }
}