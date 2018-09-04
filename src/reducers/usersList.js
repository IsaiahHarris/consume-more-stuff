import { ADD_USER } from '../actions';
import { LOGOUT, LOAD_USER } from '../actions';

const intialState = [];

const usersList = (state = intialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.user];
    case LOGOUT:
      return intialState;
    case LOAD_USER:
      console.log('action', action);
      return [action]
    default:
      return state;
  }
}

export default usersList;