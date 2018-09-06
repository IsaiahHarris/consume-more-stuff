import { LOGIN } from '../actions';
import { LOGOUT } from '../actions';

const initialState = {}

// Change usersList to users in 6 different files
const usersList = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { username: action.user.username };
    case LOGOUT:
      return {};
    default:
      return state;
  }
}

export default usersList;