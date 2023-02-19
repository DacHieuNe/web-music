import axios from "axios";

let axiosClient = axios.create({
  baseURL: "https://dachieu-api-music.onrender.com/api",
});

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
