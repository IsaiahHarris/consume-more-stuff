import axios from 'axios';
export const LOAD_CARDS = 'LOAD_CARDS';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_CARD = 'LOAD_CARD';
export const  ADD_USER ='ADD_USER';

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

export const addUser = (user) => {
  console.log('ACTION user!')
  return dispatch => {
    return axios.post('/api/login', user)
      .then(response => {
        dispatch({
          type: ADD_USER,
          user: response.data
        })
      })
  }
}