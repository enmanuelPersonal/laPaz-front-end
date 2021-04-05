import dotenv from 'dotenv';
dotenv.config();

const { REACT_APP_API_URL } = process.env;

export const uploadImagen = async (imagen) => {
  const token = localStorage.getItem('LaPaz_auth_token');

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

  const res = await fetch(`${REACT_APP_API_URL}img`, bodyOpts).then((res) =>
    res.json()
  );

  if (res) {
    return res.data;
  }
  return '';
};
