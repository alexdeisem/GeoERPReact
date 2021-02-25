import axios from '../apiProvider';
import {
  CONTRACTS_LOADED,
  CONTRACTS_TABLE_PAGE_CHANGE,
  CONTRACTS_TABLE_PAGE_SIZE_CHANGE,
  CONTRACTS_TABLE_SORTING_CHANGE,
  CONTRACTS_TABLE_SET_DEFAULT_SORTING,
} from './contractsTypes';

const loadSuccess = (contracts) => {
  return {
    type: CONTRACTS_LOADED,
    payload: contracts
  };
};

export const setContractsTblPage = (pageNumber) => {
  return {
    type: CONTRACTS_TABLE_PAGE_CHANGE,
    payload: pageNumber
  };
};

export const setContractsTblPageSize = (pageSize) => {
  return {
    type: CONTRACTS_TABLE_PAGE_SIZE_CHANGE,
    payload: pageSize
  };
};

export const setContractsTblSorting = (sortParams) => {
  return {
    type: CONTRACTS_TABLE_SORTING_CHANGE,
    payload: sortParams
  };
};

export const setContractsTblDefaultSorting = () => {
  return {
    type: CONTRACTS_TABLE_SET_DEFAULT_SORTING
  };
};

export const getContracts = (params={}) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get('contracts', { params: params })
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
