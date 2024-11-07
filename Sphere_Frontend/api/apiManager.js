import axios from "axios";

const axiosManager = axios.create({
  baseURL: "http://192.168.0.100:4000"
  //"https://app-sphere.onrender.com",
  //responseType: 'json',
  //withCredentials: true
});

export default axiosManager; 
