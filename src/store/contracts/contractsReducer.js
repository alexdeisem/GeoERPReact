import { CONTRACTS_LOADED } from './contractsTypes';

const initialState = {
  contracts: [],
}

export default function(state=initialState, action) {
  switch(action.type) {
    case CONTRACTS_LOADED:
      return {
        ...state,
        contracts: action.payload
      }
      
    default: return state
  }
}