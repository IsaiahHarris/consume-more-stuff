import { combineReducers } from 'redux';
import cardsList from './cardsList';
import categoriesList from "./categoriesList";
import conditionsList from './conditionsList'
export default combineReducers({
  categoriesList,
  cardsList,
  conditionsList
})