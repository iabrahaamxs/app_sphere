import axios from "axios";

const axiosManager = axios.create({
  baseURL: "https://app-sphere.onrender.com",
  //responseType: 'json',
  //withCredentials: true
});

export default axiosManager;
