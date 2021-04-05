import { post } from "./fetch";

export const uploadImagen = async (imagen) => {
     console.log("Estoy aqui", imagen[0]);
     const formData = new FormData();
     formData.append('image', imagen[0]);
     formData.append('nombre', 'Enmanuel');
     // for (var key of formData.entries()) {
     //      console.log(key[0] + ', ' + key[1]);
     //  }
     const res = await post('img',formData).then(res => res.json());

     console.log("============> ", res);
   };
   