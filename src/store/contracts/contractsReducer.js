import { 
  LOADED,
  TABLE_PAGINATION_CHANGE,
  TABLE_SET_DEFAULT_SORTING,
  TABLE_SORTING_CHANGE,
  TABLE_FILTERS_CHANGE
} from './contractsTypes';

const initialState = {
  contracts: [{
    id: 1,
    number: '1',
    contract_date: '2007-01-01',
    end_date: '2007-02-01',
  }],
  tblPagintaion: {
    take: 10,
    skip: 0
  },
  tblSorting: {
    sort_by: 'contract_date',
    order_by: 'desc',
  },
  tblFilters: {
    search: '',
  },
};

function contractsReducer(state=initialState, action) {
  switch(action.type) {
    case LOADED:
      return {
        ...state,
        contracts: action.payload
      }

    case TABLE_PAGINATION_CHANGE:
      return {
        ...state,
        tblPagintaion: action.payload
      }

    case TABLE_SORTING_CHANGE:
      return {
        ...state,
        tblSorting: action.payload
      }
    
    case TABLE_SET_DEFAULT_SORTING:
      return {
        ...state,
        tblSorting: {
          sort_by: 'contract_date',
          order_by: 'desc'
        }
      }

    case TABLE_FILTERS_CHANGE:
      return {
        ...state,
        tblFilters: action.payload
      }
      
    default: return state
  }
}

export { contractsReducer }
