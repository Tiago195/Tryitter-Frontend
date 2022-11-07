/* eslint-disable @typescript-eslint/no-var-requires */
// var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();
data.append('image', 'https://images.tcdn.com.br/img/img_prod/697730/adesivo_lateral_vidro_caminhao_carro_decorativo_bart_simpson_5_1147485849_1_20201005081814.jpg');

// console.log(data.getHeaders())
var config = {
  method: 'post',
  url: 'https://api.imgur.com/3/image',
  headers: {
    'Authorization': 'Client-ID 441d1df3f1a14af',
    ...{
      'content-type': 'multipart/form-data; boundary=--------------------------721213368972329007964620'
    }
  },
  data: data
};

// axios(config)
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

export default config;