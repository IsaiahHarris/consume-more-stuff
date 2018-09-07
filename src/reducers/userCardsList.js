import { LOAD_CARDS_BY_USER } from '../actions';

const initialState = [];

const userCardsList = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CARDS_BY_USER:
    console.log('REDUCER: ', action.cardsByUser);
      return [...action.cardsByUser];
    default:
      return state;
  }
};

export default userCardsList;