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

  editProdut: async (id, data) => {
    const response = await API.put('/products/' + id, data);
    return response;
  },

  deleteProduct: async (id) => {
    const response = await API.delete('/products/' + id);
    return response;
  },

  createProduct: async (data) => {
    const response = await API.post('/products', data);
    return response;
  },

}