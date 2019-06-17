import axios from 'axios';

const baseURL = 'http://localhost:8080';

export function get(endpoint) {
  return axios.get(`${baseURL}${endpoint ? '/' + endpoint : ''}`);
}
