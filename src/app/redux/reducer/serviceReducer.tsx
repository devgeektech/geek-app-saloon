// reducer.js
import { FETCH_LIST_FAILURE, FETCH_LIST_REQUEST, FETCH_LIST_SUCCESS } from '../actions/serviceAction';

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const saloonServiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIST_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_LIST_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case FETCH_LIST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default saloonServiceReducer;
