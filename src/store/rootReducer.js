import { combineReducers } from 'redux';
import { authReducer } from './auth/authReducer';
import { contractsReducer } from './contracts/contractsReducer';

const rootReducer = combineReducers({ 
  auth: authReducer,
  contracts: contractsReducer,
});

export default rootReducer;
