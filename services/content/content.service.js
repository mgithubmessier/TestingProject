import axios from 'axios';

const baseURL = 'http://localhost:8080';

export function get(endpoint, entity = 'data') {
  return axios.get(`${baseURL}${endpoint ? '/' + endpoint : ''}`).then(({ data }) => data).catch(error => {
    window.alert(`Error retrieving ${entity}. Please try again in a few minutes.`);
  });
}

export default {
  get
};
