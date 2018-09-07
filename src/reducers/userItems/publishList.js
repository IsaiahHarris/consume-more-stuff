import { LOAD_CARDS_BY_PUBLISHED } from '../../actions';

const initialState = [];

const publishList = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CARDS_BY_PUBLISHED:
      return [... action.publishCards];
    default:
      return state;
  }
}

export default publishList;