import axios from 'axios';

export const LOAD_CARDS = 'LOAD_CARDS';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_CARD = 'LOAD_CARD';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const ADD_CARD = 'ADD_CARD';
export const EDIT_CARD = 'EDIT_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const LOAD_CONDITIONS = 'LOAD_CONDITIONS';
export const LOAD_CARDS_BY_CATEGORY = 'LOAD_CARDS_BY_CATEGORY';
export const LOAD_CARDS_BY_PUBLISHED = 'LOAD_CARDS_BY_PUBLISHED';
export const LOAD_CARDS_BY_SOLD = 'LOAD_CARDS_BY_SOLD';
export const LOGIN_ERROR = 'LOGIN_ERROR';

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

export const addCard = data => {
  const imageData = data['image_data'];

  // Delete 'image_data' as it will be transformed into form data below:
  delete data['image_data'];

  // Create form data object:
  const formData = new FormData();
  formData.append('file', imageData);
  for (let key in data) {
    formData.append(key, data[key]);
  }

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };

  return dispatch => {
    return axios.post('/api/items', formData, config)
    .then(response => {
      dispatch({
        type: ADD_CARD,
        card: response.data
      });
      window.location.href = `/items/${response.data.id}`;
    })
    .catch(err=>{
      dispatch({
        type: LOGIN_ERROR,
        loginError: 'true'
      })
      window.location.href = `/items/new`;
    })
  };
};

export const editCard = data => {
  const imageData = data['image_data'];

  // Delete 'image_data' as it will be transformed into form data below:
  delete data['image_data'];

  // Create form data object:
  const formData = new FormData();
  formData.append('file', imageData);
  for (let key in data) {
    formData.append(key, data[key]);
  }

  console.log('FORM DATA', formData);

  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };

  return dispatch => {
    return axios.put(`/api/items/${data.id}`, formData, config)
      .then(response => {
        dispatch({
          type: EDIT_CARD,
          editCard: response.data
        });
        window.location.href = `/items/${data.id}`;
      });
  };
};

export const deleteCard = cardId => {
  return dispatch => {
    return axios.delete(`/api/items/${cardId}`).then(response => {
      dispatch({
        type: DELETE_CARD,
        deletedCard: response.data
      });
      window.location.href = '/';
    });
  };
};

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

export const loadCardsByCategory = category => {
  return dispatch => {
    return axios.get(`/api/items/category/${category}`).then(response => {
      dispatch({
        type: LOAD_CARDS_BY_CATEGORY,
        cardsByCategory: response.data
      });
    });
  };
};

export const loadCard = card => {
  return dispatch => {
    return axios.get(`/api/items/${card}`).then(response => {
      dispatch({
        type: LOAD_CARD,
        card: response.data
      });
    });
  };
};

export const loginUser = (user, history) => {
  return dispatch => {
    return axios
      .post('/api/login', user)
      .then(response => {
        window.localStorage.setItem('user', response.data.username);
        window.localStorage.setItem('userId', response.data.userId);

        dispatch({
          type: LOGIN,
          user: response.data
        });
        console.log('response.data', response.data);
        history.push('/inventory');
      })
      .catch((err) =>{
        dispatch({
          type:LOGIN_ERROR,
          loginError: 'true'
        })
      })
        
  };
};

export const logoutUser = () => {
  return dispatch => {
    return axios
      .get('/api/logout')
      .then(response => {
        console.log('Logout success!', response);
        
        dispatch({
          type: LOGOUT
        })

        window.localStorage.removeItem('user');
        window.localStorage.removeItem('userId');
        window.location.href = '/';
      })
      .catch(err => console.log('Logout Failed! ', err.response));
  };
};

export const registerUser = (user, history) => {
  return dispatch => {
    return axios
      .post('/api/register', user)
      .then(response => {
        console.log('User registered! ', response);
        history.push('/login');
      })
      .catch(err=>{
        dispatch({
          type: LOGIN_ERROR,
          loginError: 'true'
        })
      });
  };
};

export const checkUser = () => {
  return dispatch => {
    if (localStorage.user) {
      dispatch({
        type: LOGIN,
        user: { userId: localStorage.userId, username: localStorage.user }
      })
    }
  }
}

export const loadCardsBySold = () => {
  return dispatch => {
    return axios.get(`/api/user/sold`)
      .then(response => {
        dispatch({
          type: LOAD_CARDS_BY_SOLD,
          soldCards: response.data
        })
      })
  }
}

export const loadCardsByPublished = () => {
  return dispatch => {
    return axios.get(`/api/user/published`)
      .then(response => {
        dispatch({
          type: LOAD_CARDS_BY_PUBLISHED,
          publishCards: response.data
        })
      })
  }
}
