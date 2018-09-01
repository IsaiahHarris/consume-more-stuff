import { LOAD_CONDITIONS } from '../actions';

const initialState = []

const conditionsList = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CONDITIONS:
      return [...action.conditions]
    default:
      return state;
  }
}

export default conditionsList;