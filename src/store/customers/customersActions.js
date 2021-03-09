import axios from '../apiProvider';

export const getCustomers = (params={}) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      axios.get('customers', { params: params })
        .then(response => {
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };
};
