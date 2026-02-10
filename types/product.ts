export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  discount?: number;
  imageCover: string;
  categoryId: string;
  brandId: string;
  createdAt?: string;
  updatedAt?: string;
}