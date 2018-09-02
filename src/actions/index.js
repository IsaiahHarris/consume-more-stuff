import axios from 'axios';

export const LOAD_CARDS = 'LOAD_CARDS';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_CARD = 'LOAD_CARD';
export const ADD_USER = 'ADD_USER';
export const LOGOUT = 'LOGOUT'
export const ADD_CARD = 'ADD_CARD';
export const LOAD_CONDITIONS = 'LOAD_CONDITIONS';
export const EDIT_CARD = 'EDIT_CARD';
export const LOAD_CARDS_BY_CATEGORY = 'LOAD_CARDS_BY_CATEGORY';

export const uploadToS3 = formData => {
  return axios({
    method: 'post',
    url: '/api/s3Upload',
    data: formData,
    headers: {
      'Content-Type': `multipart/form-data; boundary=${formData._boundary}`
    }
  })
  .then(response => {
    console.log('RESPONSE', response);
    return response;
  })
};

export const loadConditions = () => {
  return dispatch => {
    return axios.get('/api/conditions').then(response => {
      dispatch({
        type: LOAD_CONDITIONS,
        conditions: response.data
      });
    });
  };
};

export const loadCards = () => {
  return dispatch => {
    return axios.get('/api/items').then(response => {
      dispatch({
        type: LOAD_CARDS,
        cards: response.data
      });
    });
  };
};

export const addCard = (data) => {
  return dispatch => {
    axios.post('/api/items', data)
      .then(response => {
        dispatch({
          type: ADD_CARD,
          card: response.data
        })
        window.location.href = `/items/${response.data.id}`
      })
  }
}

export const loadCategories = () => {
  return dispatch => {
    return axios.get('/api/categories').then(response => {
      dispatch({
        type: LOAD_CATEGORIES,
        categories: response.data
      });
    });
  };
};

export const loadCardsByCategory = (category) => {
  return dispatch => {
    return axios.get(`/api/items/category/${category}`)
      .then(response => {
        dispatch({
          type: LOAD_CARDS_BY_CATEGORY,
          cardsByCategory: response.data
        })
      })
  }
}

export const loadCard = (card) => {
  return dispatch => {
    return axios.get(`/api/items/${card}`).then(response => {
      dispatch({
        type: LOAD_CARD,
        card: response.data
      });
    });
  };
};

export const addUser = (user) => {
  return dispatch => {
    return axios.post('/api/login', user)
      .then(response => {
        dispatch({
          type: ADD_USER,
          user: response.data
        })
      })
      .catch(err => console.log('Login Error! ', err.response));
  }
}

export const logoutUser = () => {
  return dispatch => {
    return axios.get('/api/logout')
      .then(response => {
        console.log('Logout success!', response);
        dispatch({
          type: LOGOUT
        })
      })
      .catch(err => console.log('Logout Failed! ', err.response));
  }
}

export const editCard = (card) => {
  return dispatch => {
    return axios.put(`/api/items/${card.id}`, card)
      .then(response => {
        dispatch({
          type: EDIT_CARD,
          editCard: response.data
        })
        window.location.href = `/items/${card.id}`
      })
  }
}
