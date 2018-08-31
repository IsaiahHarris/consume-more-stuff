import axios from 'axios';
export const LOAD_CARDS = 'LOAD_CARDS';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_CARD = 'LOAD_CARD';

export const loadCards = () => {
  return dispatch => {
    return axios.get('/api/items')
      .then(response => {
        dispatch({
          type: LOAD_CARDS,
          cards: response.data
        })
      })
  }
}

export const loadCategories = () => {
  return dispatch => {
    return axios.get('/api/categories')
      .then(response => {
        dispatch({
          type: LOAD_CATEGORIES,
          categories: response.data
        })
      })
  }
}

export const loadCard = (card) => {
  return dispatch => {
    return axios.get(`/api/items/${card}`)
      .then(response => {
        dispatch({
          type: LOAD_CARD,
          card: response.data
        })
      })
  }
}
