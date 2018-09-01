import { combineReducers } from 'redux';
import cardsList from './cardsList';
import categoriesList from './categoriesList';
import usersList from './usersList';

export default combineReducers({
  categoriesList,
  cardsList,
  usersList
})