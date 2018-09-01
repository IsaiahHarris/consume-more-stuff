import axios from 'axios';
export const LOAD_CARDS = 'LOAD_CARDS';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_CARD = 'LOAD_CARD';
export const ADD_CARD = 'ADD_CARD';
export const LOAD_CONDITIONS = 'LOAD_CONDITIONS';

export const loadConditions = () => {
  return dispatch => {
    return axios.get('/api/conditions')
      .then(response => {
        dispatch({
          type: LOAD_CONDITIONS,
          conditions: response.data
        })
      })
  }
}

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

export const addCard = (data) => {
  return dispatch => {
    axios.post('/api/items', data)
      .then(response => {
        dispatch({
          type: ADD_CARD,
          card: response.data
        })
      })
  }
}