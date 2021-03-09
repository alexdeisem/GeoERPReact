import { message } from 'antd';
import axios from '../apiProvider';
import { echo } from 'socket/socket';
import {
  LOADED,
  UPDATE,
  TABLE_PAGINATION_CHANGE,
  TABLE_SORTING_CHANGE,
  TABLE_SET_DEFAULT_SORTING,
  TABLE_FILTERS_CHANGE,
  SUBSCRIBE_CHANNEL_EVENT,
  UNSUBSCRIBE_CHANNEL_EVENT,
} from './contractsTypes';

const loadSuccess = (contracts) => {
  return {
    type: LOADED,
    payload: contracts
  };
};

export const update = (contract) => {
  return {
    type: UPDATE,
    payload: contract
  };
};

export const setContractsTblPagination = (pagination) => {
  return {
    type: TABLE_PAGINATION_CHANGE,
    payload: pagination
  };
};

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
  };
};

export const updateContract = (contract) => {
  return (dispatch) => {
    return new Promise((resolve) => {
      axios.patch(`contracts/${contract.id}`, contract)
        .then(response => {
          // dispatch(update(contract));
          // message.success('Успешно! Статус изменен', 2.5);
          resolve(response.data);
        })
        .catch((error) => {
          const errorMessage = Object.values(error.response.data).join(', ');
          message.error(`Ошибка! ${errorMessage}`, 5);
          return false;
        });
    });
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

export const subscribeChannelEvent = (eventName, handler) => {
  echo.private('contracts')
    .listen(eventName, handler);
  return {
    type: SUBSCRIBE_CHANNEL_EVENT,
    payload: eventName
  };
};

export const unsubscribeChannelEvent = (eventName) => {
  echo.channel('contracts').stopListening(eventName)
  return {
    type: UNSUBSCRIBE_CHANNEL_EVENT,
    payload: eventName
  };
};

export const getNextNumber = (year='') => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get(`contracts/numbers/next/${year}`)
        .then(response => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }
}
