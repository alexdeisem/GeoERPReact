import { AUTH_LOGIN_SUCCESS, AUTH_LOGOUT } from './authTypes';

const initialState = {
  isLoggedIn: false,
  isAdmin: false,
  token: ''
}

export default function(state=initialState, action) {
  switch(action.type) {
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        isAdmin: action.payload.user.isAdmin,
        token: action.payload.token,
      }
        
    case AUTH_LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        isAdmin: false,
        token: '',
      }
      
    default: return state
  }
}