import { LOAD_ITEM_STATUSES } from '../actions';

const initialState = [];

const itemStatusesList = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ITEM_STATUSES:
      return [...action.itemStatuses];
    default:
      return state;
  }
};

export default itemStatusesList;
