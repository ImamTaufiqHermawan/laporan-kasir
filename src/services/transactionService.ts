// @ts-nocheck
import API from "./api"

export const TransactionService = {

  getTransactions: async () => {
    const response = await API.get('/transactions');
    console.log(response)
    return response;
  },

  getTransactionById: async (id) => {
    const response = await API.get('/transactions/' + id);
    return response;
  },

  editTransaction: async (id, data) => {
    const response = await API.put('/transactions/' + id, data);
    return response;
  },

  deleteTransaction: async (id) => {
    const response = await API.delete('/transactions/' + id);
    return response;
  },

  createTransaction: async (data) => {
    const response = await API.post('/transactions', data);
    return response;
  },

}