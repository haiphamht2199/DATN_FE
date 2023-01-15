
import axios from 'axios'

const axiosImage = axios.create({
 baseURL: 'http://localhost:8081/api/v1',
 timeout: 5000,
 headers: {
  'Access-Control-Allow-Origin': '*',
  'Authorization': "Bearer " + localStorage.getItem('token'),
  'Content-Type': 'multipart/form-data',
  'accept': 'application/json'
 }
});

export default axiosImage;