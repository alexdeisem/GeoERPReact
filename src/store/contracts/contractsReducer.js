import { CONTRACTS_LOADED } from './contractsTypes';

const initialState = {
  contracts: [{
    number: '1',
    contract_date: '2007-01-01',
    end_date: '2007-02-01',
  }],
}

function contractsReducer(state=initialState, action) {
  switch(action.type) {
    case CONTRACTS_LOADED:
      return {
        ...state,
        contracts: action.payload
      }
      
    default: return state
  }
}

export { contractsReducer }