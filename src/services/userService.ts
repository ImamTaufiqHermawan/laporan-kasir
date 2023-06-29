import API from "./api"

export const UserService = {

  getUsers: async () => {
    const response = await API.get('/users');
    return response;
  },

  getUserById: async (id) => {
    const response = await API.get('/users/' + id);
    return response;
  },

  editUser: async (id, data) => {
    const response = await API.put('/users/' + id, data);
    return response;
  },

  deleteProduct: async (id) => {
    const response = await API.delete('/products/' + id);
    return response;
  },

  createUser: async (data) => {
    const response = await API.post('/users', data);
    return response;
  },

}