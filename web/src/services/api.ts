import axios from 'axios';

//here will be implemented the api that is under development

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

export default api;
