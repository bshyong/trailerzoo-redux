import {
  MOVIES_LOAD,
  MOVIES_LOAD_SUCCESS,
  MOVIES_LOAD_FAIL
} from './actionTypes';

export function loadAll() {
  return {
    types: [MOVIES_LOAD, MOVIES_LOAD_SUCCESS, MOVIES_LOAD_FAIL],
    promise: (client) => {
      return client.get('/movies')
        .then((result) => {
          return result
        })
    }
  };
}
