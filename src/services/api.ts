import axios from "axios";

const token = `Bearer ${localStorage.getItem("token")}`;
const baseURL = "https://api-sismo.up.railway.app/api/v1";

const API = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
    Authorization: token,
  },
});

API.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status !== 401) {
      throw err;
    }
    throw err;
    // console.log(err.response)
    // if (typeof err.response.data.error.name !== 'undefined') {
    //   if ( err.response.data.error.name === 'TokenExpiredError') {
    //     // store.dispatch(logout());
    //     throw err
    //   }
    // }
  }
);

export default API;
