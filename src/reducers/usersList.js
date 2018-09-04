import { ADD_USER } from '../actions';
import { LOGOUT } from '../actions';

const intialState = []
// username: window.localStorage.getItem('user')


const usersList = (state = intialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return [action.user.username];
    case LOGOUT:
      return [];
    default:
      return state;
  }
}

export default usersList;