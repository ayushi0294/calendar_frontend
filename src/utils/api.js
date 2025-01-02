import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BASE_API_URL}/api`  || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiGet = async (url) => {

  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error(`GET ${url} failed:`, error);
    throw error;
  }
};

export const apiPost = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error(`POST ${url} failed:`, error);
    throw error;
  }
};

export const apiPut = async (url, data) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    console.error(`PUT ${url} failed:`, error);
    throw error;
  }
};

export const apiDelete = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error(`DELETE ${url} failed:`, error);
    throw error;
  }
};
