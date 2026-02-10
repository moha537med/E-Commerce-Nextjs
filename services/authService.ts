import api from "./api";

export const signin = (email: string, password: string) =>
  api.post("/auth/signin", { email, password });

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}) => api.post("/auth/signup", data);