import axios from 'axios';
const token = window.localStorage.getItem('token');
const axiosIntance = axios.create({
 baseURL: "http://localhost:8080/api/v1/",
 headers: {
  'Authorization': token ? `Bearer ${token}` : ''
 },
});
export default axiosIntance