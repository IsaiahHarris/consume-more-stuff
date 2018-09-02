import { ADD_USER } from '../actions';
import { LOGOUT } from '../actions';

const intialState = [];

const usersList = (state = intialState, action) => {
  console.log('state :', state);
  console.log('REDUCER user!');
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