import api from "./api";

export const getOrders = () => api.get("/orders");

export const createOrder = (cartId: string, data: any) =>
  api.post(`/orders/checkout-session/${cartId}`, data);
