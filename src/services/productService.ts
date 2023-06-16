import API from "./api"

export const ProductService = {

  getProducts: async () => {
    const response = await API.get('/products');
    console.log(response)
    return response;
  },

  getProductById: async (id) => {
    const response = await API.get('/products/' + id);
    return response;
  },


  // postAirport: async (id, data) => {
  //   const response = await API.put('/airports/update/' + id, data);
  //   return response;
  // },

  // deleteAirport: async (id) => {
  //   const response = await API.delete('/airports/delete/' + id);
  //   return response;
  // },

  createProduct: async (data) => {
    const response = await API.post('/products', data);
    return response;
  },

}