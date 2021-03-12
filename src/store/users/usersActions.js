import axios from '../apiProvider';
import { FETCH_USERS } from './types';

const loadSuccess = (users) => {
  return {
    type: FETCH_USERS,
    payload: users
  };
};

export const fetchUsers = (params={}) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get('users', {params: params})
        .then(response => {
          dispatch(loadSuccess(response.data));
          resolve(response.data);
        })
        .catch(() => {
          console.log('users loading fails')
          reject();
        });
    });
  };
};
