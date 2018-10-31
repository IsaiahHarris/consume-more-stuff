import { combineReducers } from 'redux';

import usersList from './usersList';
import cardsList from './cardsList';
import userCardsList from './userCardsList';
import conditionsList from './conditionsList';
import categoriesList from './categoriesList';
import itemStatusesList from './itemStatusesList';

export default combineReducers({
  usersList,
  cardsList,
  userCardsList,
  conditionsList,
  categoriesList,
  itemStatusesList,
});
