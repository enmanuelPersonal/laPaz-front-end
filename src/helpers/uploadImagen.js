import { post } from './fetch';

import dotenv from 'dotenv';
dotenv.config();

const { REACT_APP_API_URL } = process.env;

export const uploadImagen = async (imagen) => {
  const token = localStorage.getItem('LaPaz_auth_token');

  console.log('Estoy aqui', imagen[0]);
  const formData = new FormData();
  formData.append('image', imagen[0]);
  formData.append('nombre', 'Enmanuel');
  const bodyOpts = {
    method: 'POST',
    headers: {
      LaPaz_auth_token: token,
      credentials: 'include',
    },
    body: formData,
  };

  // for (var key of formData.entries()) {
  //      console.log(key[0] + ', ' + key[1]);
  //  }
  const res = await fetch(`${REACT_APP_API_URL}img`, bodyOpts).then((res) =>
    res.json()
  );

  console.log('============> ', res);
};
