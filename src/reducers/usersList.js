import { ADD_USER } from '../actions';

const intialState = [];

const usersList = (state = intialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return [...state, action.user];
    default:
      return state;
  }
}

export default usersList;