import { PAGE_CHANGED, PAGE_SIZE_CHANGED } from './tableTypes';

const initialState = {
  page: 1,
  pageSize: 10,
}

export default function(state=initialState, action) {
  switch(action.type) {
    case PAGE_CHANGED:
      return {
        ...state,
        page: action.payload
      }

    case PAGE_SIZE_CHANGED:
      return {
        ...state,
        pageSize: action.payload
      }
      
    default: return state
  }
}