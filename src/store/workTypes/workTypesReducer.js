import { 
  FETCH_WORK_TYPES,
} from './workTypesTypes';

const initialState = {
  workTypes: []
};

function workTypesReducer(state=initialState, action) {
  switch(action.type) {
    case FETCH_WORK_TYPES:
      return {
        ...state,
        workTypes: action.payload
      }
      
    default: return state
  };
};

export { workTypesReducer }
