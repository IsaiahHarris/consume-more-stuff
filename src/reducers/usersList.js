import { LOGIN } from '../actions';
import { LOGOUT } from '../actions';

const initialState = {}

const usersList = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
         username: action.user.username,
         id: action.user.id 
        };
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

export default usersList;