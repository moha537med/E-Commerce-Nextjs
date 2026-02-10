import api from "./api";

export const getCartItems = () => api.get("/cart");

export const addToCart = (productId: string) =>
  api.post("/cart", { productId });  

export const updateCartItem = (productId: string, count: number) =>
  api.put(`/cart/${productId}`, { count });

export const removeCartItem = (productId: string) =>
  api.delete(`/cart/${productId}`);