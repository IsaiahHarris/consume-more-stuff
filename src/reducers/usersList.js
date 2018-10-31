import { LOGIN, LOGOUT, EDIT_PASSWORD, LOGIN_ERROR} from '../actions';


const initialState = {};

// Change usersList to users in 6 different files
const usersList = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        username: action.user.username,
        id: action.user.id
      };
    case LOGOUT:
      return {};
    case EDIT_PASSWORD:
      return [...state]
    case LOGIN_ERROR:
      return {error: action.loginError};
    default:
      return state;
  }
};

export default usersList;
