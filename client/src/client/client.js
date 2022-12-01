import axios from 'axios';

const accessToken = localStorage.getItem('accessToken') || '';

export const preClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    withCredentials: true,
    'Content-Type': `application/json`,
  },
});

export const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    withCredentials: true,
    Authorization: `${accessToken}`,
    'Content-Type': `application/json`,
  },
});

export const clientImg = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    withCredentials: true,
    Authorization: `${accessToken}`,
    'Content-Type': `multipart/form-data`,
  },
});
