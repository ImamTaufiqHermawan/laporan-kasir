import API from "./api"

export const TransactionService = {

  getTransactions: async () => {
    const response = await API.get('/transactions');
    console.log(response)
    return response;
  },

  // getProductById: async (id) => {
  //   const response = await API.get('/products/' + id);
  //   return response;
  // },

  // editProdut: async (id, data) => {
  //   const response = await API.put('/products/' + id, data);
  //   return response;
  // },

  // deleteProduct: async (id) => {
  //   const response = await API.delete('/products/' + id);
  //   return response;
  // },

  createTransaction: async (data) => {
    const response = await API.post('/transactions', data);
    return response;
  },

}