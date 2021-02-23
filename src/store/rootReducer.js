import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import contractsReducer from './contracts/contractsReducer';
import contractsTableReducer from './tableContarcts/tableReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  contracts: contractsReducer,
  contractsTable: contractsTableReducer,
});

export default rootReducer;
