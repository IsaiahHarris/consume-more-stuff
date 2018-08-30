import { LOAD_CATEGORIES } from '../actions';

const initialState = []

const categoriesList = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CATEGORIES:
      return [...action.categories]
    default:
      return state;
  }
}

export default categoriesList;
