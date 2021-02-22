import axios from 'axios';
import {
  AUTH_SET_USER,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_LOGOUT,
} from './authTypes';

const setUser = (userData) => {
  return {
    type: AUTH_SET_USER,
    payload: userData
  }
}

const loginSuccess = (data) => {
  return {
    type: AUTH_LOGIN_SUCCESS,
    payload: data
  }
}

const loginFail = () => {
  return {
    type: AUTH_LOGIN_FAIL,
  }
}

const setAuthToStorage = (data) => {
  localStorage.setItem('token', data.token);
  localStorage.setItem('isAdmin', data.user.isAdmin);
  localStorage.setItem('isLoggedIn', true);
  localStorage.setItem('user', JSON.stringify(data.user));

  axios.defaults.headers.common = {'Authorization': `Bearer ${data.token}`}
}

export const login = (params) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post('http://geoerp.api/api/login', params)
        .then(response => {
          dispatch(loginSuccess(response.data));
          setAuthToStorage(response.data);
          resolve(response.data.user.isAdmin);
        })
        .catch(() => {
          // TODO: make a notification reducer for handling errors
          dispatch(loginFail);
          console.log('Login fail');
          reject();
        });
    })
  }
}

export const logout = () => {
    axios.defaults.headers.common = {'Authorization': ''}
    return {
      type: AUTH_LOGOUT,
    };
}

export const getUser = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get('http://geoerp.api/api/user')
        .then(response => {
          if (response.data.deleted) {
            dispatch(logout);
          } else {
            dispatch(setUser(response.data));
          }

          resolve(response.data);
        })
        .catch(() => {
          dispatch(loginFail);
          dispatch(logout);
          reject();
        });
    });
  }
}