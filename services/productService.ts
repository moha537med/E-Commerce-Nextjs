import api from "./api";

export const getProducts = () => api.get("/products");
export const getProductById = (id: string) => api.get(`/products/${id}`);
export const getCategories = () => api.get("/categories");
export const getCategoryById = (id: string) => api.get(`/categories/${id}`);
export const getBrands = () => api.get("/brands");
export const getBrandById = (id: string) => api.get(`/brands/${id}`);