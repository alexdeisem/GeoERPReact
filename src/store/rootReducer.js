import { combineReducers } from 'redux';
import { authReducer } from './auth/authReducer';
import { contractsReducer } from './contracts/contractsReducer';
import { workTypesReducer } from './workTypes/workTypesReducer';

const rootReducer = combineReducers({ 
  auth: authReducer,
  contracts: contractsReducer,
  workTypes: workTypesReducer,
});

export default rootReducer;
