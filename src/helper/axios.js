
import axios from 'axios'

const axiosInstance = axios.create({
 baseURL: 'http://localhost:8080/api/v1',
 timeout: 5000,
 headers: {
  'Access-Control-Allow-Origin': '*',
  'Authorization': "Bearer " + localStorage.getItem('token'),
  'Content-Type': 'multipart/form-data',
  'accept': 'application/json'
 }
});

export default axiosInstance;