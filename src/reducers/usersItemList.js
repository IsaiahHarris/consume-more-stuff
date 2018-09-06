import { LOAD_CARDS_BY_PUBLISHED, LOAD_CARDS_BY_SOLD } from '../actions';

const initialState = [];

const usersItemList = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CARDS_BY_SOLD:
      return [... action.soldCards];
    default:
      return state;
  }
}

export default usersItemList;