import axios from 'axios';

/**
 * Creates an axios instance from the .env file
 * @type {AxiosInstance}
 */
const api = axios.create({
  baseURL: 'http://localhost:2000/',
});

export { api };