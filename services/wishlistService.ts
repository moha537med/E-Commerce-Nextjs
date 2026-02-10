import api from "./api";

export const getWishlistItems = () => api.get("/wishlist");

export const addWishlistItem = (productId: string) =>
  api.post("/wishlist", { productId });

export const removeWishlistItem = (productId: string) =>
  api.delete(`/wishlist/${productId}`);