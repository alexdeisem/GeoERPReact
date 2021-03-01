import axios from '../apiProvider';
import {
  LOADED,
  TABLE_PAGINATION_CHANGE,
  TABLE_SORTING_CHANGE,
  TABLE_SET_DEFAULT_SORTING,
  TABLE_FILTERS_CHANGE,
} from './contractsTypes';

const loadSuccess = (contracts) => {
  return {
    type: LOADED,
    payload: contracts
  };
};

export const setContractsTblPagination = (pagination) => {
  return {
    type: TABLE_PAGINATION_CHANGE,
    payload: pagination
  }
}

export const setContractsTblSorting = (sortParams) => {
  return {
    type: TABLE_SORTING_CHANGE,
    payload: sortParams
  };
};

export const setContractsTblDefaultSorting = () => {
  return {
    type: TABLE_SET_DEFAULT_SORTING
  };
};

export const setContractsTblFilters = (filters) => {
  return {
    type: TABLE_FILTERS_CHANGE,
    payload: filters
  }
}

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
