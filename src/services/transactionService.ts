// @ts-nocheck
import API from "./api"

export const TransactionService = {

  getTransactions: async (
    query: { name: string, date: date, page: number; limit: number, },
  ) => {
    const params = {
      name: query?.name,
      date: query?.date,
      page: query?.page,
      limit: query?.limit,
    };
    const url = '/transactions';

    const response = await API.get(url, { params });
    return response;
  },

  exportTransactions: async (
    query: { name: string, date: date },
  ) => {
    try {
      const params = {
        name: query?.name,
        date: query?.date,
      };
      const apiUrl = '/transactions/export';

      const response = await API.get(apiUrl, { params }, {
        responseType: 'blob', // Set the response type to blob
      });

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'test.xlsx'); // Specify the file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting data:', error);
    }
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

  getStocks: async (
    query: { name: string, date: date, page: number; limit: number, },
  ) => {
    const params = {
      name: query?.name,
      date: query?.date,
      page: query?.page,
      limit: query?.limit,
    };
    const url = '/products/stock';

    const response = await API.get(url, { params });
    return response;
  }
}