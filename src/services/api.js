import axios from 'axios';

const api = axios.create({
  baseURL: 'https://www.app.wettor.com.br/app',
});

export default api;