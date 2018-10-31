import {
  LOAD_CARDS,
  LOAD_CARD,
  ADD_CARD,
  EDIT_CARD,
  LOAD_CARDS_BY_CATEGORY
} from '../actions';

const initialState = [];

const cardsList = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CARDS:
      return [...action.cards];
    case LOAD_CARDS_BY_CATEGORY:
      return [...action.cardsByCategory];
    case LOAD_CARD:
      return [action.card];
    case ADD_CARD:
      return [...state, action.card];
    case EDIT_CARD:
      return [...state];
    default:
      return state;
  }
};

export default cardsList;
