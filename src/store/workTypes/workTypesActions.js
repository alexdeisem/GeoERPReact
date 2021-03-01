import axios from '../apiProvider';
import {
  FETCH_WORK_TYPES,
} from './workTypesTypes'

const loadSuccess = (workTypes) => {
  return {
    type: FETCH_WORK_TYPES,
    payload: workTypes
  };
};

export const fetchWorkTypes = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get('work-types')
        .then(response => {
          dispatch(loadSuccess(response.data));
          resolve(response.data);
        })
        .catch(() => {
          console.log('work types loading fails')
          reject();
        });
    });
  };
};
