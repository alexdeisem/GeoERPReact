import axios from '../apiProvider';
import { CONTRACTS_LOADED } from './contractsTypes';

const loadSuccess = (contracts) => {
  return {
    type: CONTRACTS_LOADED,
    payload: contracts
  }
}

export const getContracts = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get('contracts')
        .then(response => {
          dispatch(loadSuccess(response.data.contracts));
          resolve(response.data);
        })
        .catch(() => {
          console.log('contracts loading fails')
          reject();
        });
    });
  };
};