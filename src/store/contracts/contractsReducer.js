import { 
  LOADED,
  UPDATE,
  TABLE_PAGINATION_CHANGE,
  TABLE_SET_DEFAULT_SORTING,
  TABLE_SORTING_CHANGE,
  TABLE_FILTERS_CHANGE,
  SUBSCRIBE_CHANNEL_EVENT,
  UNSUBSCRIBE_CHANNEL_EVENT,
} from './contractsTypes';

const initialState = {
  contracts: [{
    id: 1,
    number: '1',
    contract_date: '2007-01-01',
    end_date: '2007-02-01',
    status: 'новый'
  }],
  channels: [],
  tblPagintaion: {
    take: 15,
    skip: 0
  },
  tblSorting: {
    sort_by: 'contract_date',
    order_by: 'desc',
  },
  tblFilters: {
    search: '',
    work_types: [],
    date_start: '2007-01-01',
    date_end: new Date().toISOString().slice(0, 10),
    new: true,
    in_work: true,
    complete: true,
    cancel: false,
    year: false,
  },
};

function contractsReducer(state=initialState, action) {
  switch(action.type) {
    case LOADED:
      return {
        ...state,
        contracts: action.payload
      }

    case UPDATE:
      return {
        ...state,
        contracts: state.contracts.map(
          contract => {
            if (contract.id !== action.payload.id) {
              return contract;
            }

            return {...contract, ...action.payload}
          }
        )
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
        tblFilters: {
          ...state.tblFilters,
          ...action.payload
        },
      }

    case SUBSCRIBE_CHANNEL_EVENT:
      return {
        ...state,
        channels: [ ...state.channels, action.payload]
      }

    case UNSUBSCRIBE_CHANNEL_EVENT:
      return {
        ...state,
        channels: state.channels.filter(i => action.payload !== i)
      }
      
    default: return state
  }
}

export { contractsReducer }
