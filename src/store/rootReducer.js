import { combineReducers } from 'redux';
import { authReducer } from './auth/authReducer';
import { contractsReducer } from './contracts/contractsReducer';
import { usersReducer } from './users/usersReducer';
import { workTypesReducer } from './workTypes/workTypesReducer';

const rootReducer = combineReducers({ 
  auth: authReducer,
  contracts: contractsReducer,
  users: usersReducer,
  workTypes: workTypesReducer,
});

export default rootReducer;
