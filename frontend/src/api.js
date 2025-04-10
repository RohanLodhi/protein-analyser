import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

export const voteProtein = (id, action) =>
    api.post(`/protein-powders/${id}/${action}/`);
  
export const voteFood = (id, action) =>
    api.post(`/food-products/${id}/${action}/`);

export const submitProtein = (data) =>
    api.post('/submit/protein-powder/', data);
  
export const submitFood = (data) =>
    api.post('/submit/food-product/', data);
  

export default api;
