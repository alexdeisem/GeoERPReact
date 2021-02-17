import axios from 'axios';
import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
} from './authTypes';

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

export const login = (params) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.post('http://geoerp.api/api/login', params)
        .then(response => {
          dispatch(loginSuccess(response.data));
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