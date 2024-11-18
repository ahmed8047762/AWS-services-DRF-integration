import axios from 'axios';

const API_URL = '/api/posts/';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

export const getPosts = () => api.get('');
export const getPost = (id) => api.get(`${id}/`);
export const createPost = (formData) => api.post('', formData);
export const updatePost = (id, formData) => api.put(`${id}/`, formData);
export const deletePost = (id) => api.delete(`${id}/`);
