import axios from 'axios';
export const LOAD_CARDS = 'LOAD_CARDS';

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

