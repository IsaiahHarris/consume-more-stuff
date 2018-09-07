import { combineReducers } from 'redux';
import cardsList from './cardsList';
import conditionsList from './conditionsList';
import categoriesList from './categoriesList';
import usersList from './usersList';
import itemStatusesList from './itemStatusesList';

export default combineReducers({
  categoriesList,
  cardsList,
  conditionsList,
  usersList,
  itemStatusesList
});
