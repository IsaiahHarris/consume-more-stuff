import { LOGIN, LOGOUT, LOGIN_ERROR } from '../actions';


const initialState = {}

// Change usersList to users in 6 different files
const usersList = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
    console.log('userList action: ', action.user);
      return { 
        'userId': action.user.userId, 
        'username': action.user.username 
      };
    case LOGOUT:
      return {};
    case LOGIN_ERROR:
      return {error: action.loginError};
    default:
      return state;
  }
}

export default usersList;