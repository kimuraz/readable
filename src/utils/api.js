const apiURL = 'http://localhost:3001';
const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  Authorization: 'whatever-i-want'
};

const getEndpoint = endpoint =>
  fetch(`${apiURL}/${endpoint}`, { headers }).then(res => res.json());

const postPutEndpoint = (endpoint, data, method = 'POST') =>
  fetch(`${apiURL}/${endpoint}`, {
    method,
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json());

const deleteEndpoint = endpoint =>
  fetch(`${apiURL}/${endpoint}`, { method: 'DELETE', headers }).then(res =>
    res.json()
  );

export const categoryApi = {
  getAll: () => getEndpoint('categories'),
  getPosts: id => getEndpoint(`${id}/posts`)
};

export const postsApi = {
  getAll: () => getEndpoint('posts'),
  add: data => postPutEndpoint('posts', data),
  getById: id => getEndpoint(`posts/${id}`),
  vote: (id, data) => postPutEndpoint(`posts/${id}`, { option: data }),
  edit: (id, data) => postPutEndpoint(`posts/${id}`, data, 'PUT'),
  deleteById: id => deleteEndpoint(id),
  getComments: id => getEndpoint(`posts/${id}/comments`)
};

export const commentsApi = {
  add: data => postPutEndpoint('comments', data),
  getById: id => getEndpoint(`comments/${id}`),
  vote: (id, data) => postPutEndpoint(`comments/${id}`, { option: data }),
  edit: (id, data) => postPutEndpoint(`comments/${id}`, data, 'PUT'),
  deleteById: id => deleteEndpoint => `comments/${id}`
};

export default {
  categoryApi,
  postsApi,
  commentsApi
};
