import axios from "axios";

export const api = axios.create({
  baseURL: "https://way-premios-back-end.vercel.app",
});

export const apiLocal = axios.create({
  baseURL: "http://127.0.0.1:33333",
});

export const mercadoPago = axios.create({
  baseURL: "https://api.mercadopago.com",
});

mercadoPago.interceptors.request.use(async (config) => {
  const token = import.meta.env.VITE_MERCADOPAGO_ID
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
