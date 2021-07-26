import axios from 'axios';
import AuthService from '../services/AuthService';

const instance = axios.create({
  baseURL: 'https://us-central1-onebutton-ae926.cloudfunctions.net/',
  headers: {'Content-Type': 'application/json'},
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN', // `xsrfCookieName` is the name of the cookie to use as a value for xsrf token
  xsrfHeaderName: 'X-XSRF-TOKEN', // `xsrfHeaderName` is the name of the http header that carries the xsrf token value
});

instance.interceptors.request.use(async request => {
  // if (AuthService.getUser())
  // request.headers.Authorization = `Bearer ${await AuthService.getToken()}`;
  return request;
});
instance.interceptors.response.use(response => response.data);

export const http = instance;
