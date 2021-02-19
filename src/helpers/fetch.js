import dotenv from 'dotenv';
dotenv.config();

const { REACT_APP_API_URL } = process.env;

export const get = (url) => {
  const token = localStorage.getItem('LaPaz_auth_token');

  const bodyOpts = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      LaPaz_auth_token: token,
      credentials: 'include',
    },
  };
  return fetch(`${REACT_APP_API_URL}${url}`, bodyOpts);
};

export const post = (url, body = {}) => {
  const token = localStorage.getItem('LaPaz_auth_token');

  const bodyOpts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      LaPaz_auth_token: token,
      credentials: 'include',
    },
    body: JSON.stringify(body),
  };
  return fetch(`${REACT_APP_API_URL}${url}`, bodyOpts);
};

export const put = (url, body = {}) => {
  const token = localStorage.getItem('LaPaz_auth_token');

  const bodyOpts = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      LaPaz_auth_token: token,
      credentials: 'include',
    },
    body: JSON.stringify(body),
  };
  return fetch(`${REACT_APP_API_URL}${url}`, bodyOpts);
};
