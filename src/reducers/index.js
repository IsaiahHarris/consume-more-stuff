import { combineReducers } from 'redux';
import cardsList from './cardsList';
import categoriesList from "./categoriesList";

export default combineReducers({
  categoriesList,
  cardsList
})