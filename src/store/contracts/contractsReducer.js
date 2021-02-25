import { 
  CONTRACTS_LOADED,
  CONTRACTS_TABLE_PAGE_CHANGE,
  CONTRACTS_TABLE_PAGE_SIZE_CHANGE,
  CONTRACTS_TABLE_SET_DEFAULT_SORTING,
  CONTRACTS_TABLE_SORTING_CHANGE,
} from './contractsTypes';

const initialState = {
  contracts: [{
    id: 1,
    number: '1',
    contract_date: '2007-01-01',
    end_date: '2007-02-01',
  }],
  tblPage: 1,
  tblPageSize: 10,
  tblSorting: {
    sortBy: 'contract_date',
    orderBy: 'desc',
  }
};

function contractsReducer(state=initialState, action) {
  switch(action.type) {
    case CONTRACTS_LOADED:
      return {
        ...state,
        contracts: action.payload
      }

    case CONTRACTS_TABLE_PAGE_CHANGE:
      return {
        ...state,
        tblPage: action.payload
      }

    case CONTRACTS_TABLE_PAGE_SIZE_CHANGE:
      return {
        ...state,
        tblPageSize: action.payload
      }

    case CONTRACTS_TABLE_SORTING_CHANGE:
      return {
        ...state,
        tblSorting: {
          sortBy: action.payload.sortBy,
          orderBy: action.payload.orderBy
        }
      }
    
    case CONTRACTS_TABLE_SET_DEFAULT_SORTING:
      return {
        ...state,
        tblSorting: {
          sortBy: 'contracts_date',
          orderBy: 'desc'
        }
      }
      
    default: return state
  }
}

export { contractsReducer }