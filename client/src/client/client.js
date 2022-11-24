import axios from 'axios';

const accessToken = localStorage.getItem('accessToken') || '';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    withCredentials: true,
    Authorization: `${accessToken}`,
    'Content-Type': `application/json`,
  },
});

export default client;
