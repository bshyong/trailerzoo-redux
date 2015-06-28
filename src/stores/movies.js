import {
  MOVIES_LOAD,
  MOVIES_LOAD_SUCCESS,
  MOVIES_LOAD_FAIL
} from '../actions/actionTypes';

const initialState = {
  loaded: false,
  movies: []
};

export default function info(state = initialState, action = {}) {
  switch (action.type) {
    case MOVIES_LOAD:
      return {
        ...state,
        loading: true
      };
    case MOVIES_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        movies: action.result
      };
    case MOVIES_LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}
