import axiosClient from "./axiosClient";

const homeApi = {
  getFullAPI(params) {
    const url = "/homes";
    return axiosClient.get(url, {
      params,
    });
  },
};

export default homeApi;
