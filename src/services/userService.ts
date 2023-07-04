import API from "./api"

export const UserService = {

  getUsers: async () => {
    const response = await API.get('/users');
    return response;
  },

  getUserByI: async (id) => {
    const response = await API.get('/users/' + id);
    return response;
  },

  editUser: async (id, data) => {
    const response = await API.put('/users/' + id, data);
    return response;
  },

  deleteUser: async (id) => {
    const response = await API.delete('/users/' + id);
    return response;
  },

  createUser: async (data) => {
    const response = await API.post('/users', data);
    return response;
  },

  loginUser: async (data) => {
    console.log('response')
    const response = await API.post('/auth/login', data);
    console.log(response)
    console.log('response')
    return response;
  },

}