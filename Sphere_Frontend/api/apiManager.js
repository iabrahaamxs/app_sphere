import axios from "axios";

console.log(process.env.EXPO_PUBLIC_API_URL_BASE); 

const axiosManager = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL_BASE,
  //"https://app-sphere.onrender.com",
  //responseType: 'json',
  //withCredentials: true
});

export default axiosManager;
