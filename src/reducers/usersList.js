import { ADD_USER } from '../actions';
import { LOGOUT } from '../actions';

const intialState = [];

const usersList = (state = intialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.user];
    case LOGOUT:
      return intialState;
    default:
      return state;
  }
}

export default usersList;