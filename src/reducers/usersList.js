import { LOGIN, LOGOUT, EDIT_PASSWORD } from '../actions';


const initialState = {};

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
      console.log('state', state);
      console.log('action', action);
      // state.map(password => {
      //     state.splice(state.indexOf(password), 1)
      //     state.push(action.editPassword);
      // })
      return [...state]
    default:
      return state;
  }
};

export default usersList;
