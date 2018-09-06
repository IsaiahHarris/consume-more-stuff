import { LOGIN, LOGOUT, LOGIN_ERROR } from '../actions';


const initialState = {}

const usersList = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { username: action.user.username };
    case LOGOUT:
      return {};
    case LOGIN_ERROR:
    console.log('action', action);
      return {error: action.loginError};
    default:
      return state;
  }
}

export default usersList;