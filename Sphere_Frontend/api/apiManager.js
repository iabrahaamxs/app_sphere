import axios from "axios";

const axiosManager = axios.create({
  baseURL: "http://192.168.0.107:4000",
  //responseType: 'json',
  //withCredentials: true
});

export default axiosManager;