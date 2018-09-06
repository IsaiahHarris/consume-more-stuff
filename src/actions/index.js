import axios from 'axios';

export const LOAD_CARDS = 'LOAD_CARDS';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_CARD = 'LOAD_CARD';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';
export const ADD_CARD = 'ADD_CARD';
export const LOAD_CONDITIONS = 'LOAD_CONDITIONS';
export const EDIT_CARD = 'EDIT_CARD';
export const LOAD_CARDS_BY_CATEGORY = 'LOAD_CARDS_BY_CATEGORY';

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
    return axios.post('/api/items', formData, config).then(response => {
      dispatch({
        type: ADD_CARD,
        card: response.data
      });
      window.location.href = `/items/${response.data.id}`;
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
    return axios.post('/api/login', user)
      .then(response => {
        console.log('response', response);
        window.localStorage.setItem('user', response.data.username);
        window.localStorage.setItem('userid', response.data.id)
        dispatch({
          type: LOGIN,
          user: response.data
        });
        console.log('response.data', response.data);
        history.push('/');
      })
      .catch(err => console.log('Login Error! ', err.response));
  };
};

export const logoutUser = () => {
  return dispatch => {
    return axios.get('/api/logout')
      .then(response => {
        console.log('Logout success!', response);
        dispatch({
          type: LOGOUT
        });
        window.localStorage.removeItem('user');
         window.localStorage.removeItem('userid')
      })
      .catch(err => console.log('Logout Failed! ', err.response));
  };
};

export const registerUser = (user, history) => {
  return dispatch => {
    return axios.post('/api/register', user)
      .then(response => {
        console.log('User registered! ', response);
        history.push('/login');
      })
      .catch(err => console.log('Registration error! ', err.response));
  };
};

export const editCard = card => {
  return dispatch => {
    return axios.put(`/api/items/${card.id}`, card).then(response => {
      dispatch({
        type: EDIT_CARD,
        editCard: response.data
      });
      window.location.href = `/items/${card.id}`;
    });
  };
};

export const checkUser = () => {
  return dispatch => {
    if (localStorage.user) {
      dispatch({
        type: LOGIN,
        user: { username: localStorage.user,
          id: localStorage.userid
         }
      });
    }
  };
};
