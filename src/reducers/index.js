import { combineReducers } from 'redux';
import cardsList from './cardsList';
import conditionsList from './conditionsList';
import categoriesList from './categoriesList';
import usersList from './usersList';
import soldList from './userItems/soldList';
import publishList from './userItems/publishList';

export default combineReducers({
  categoriesList,
  cardsList,
  conditionsList,
  usersList,
  soldList,
  publishList
})