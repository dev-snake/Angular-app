export interface Products {
  _id: string;
  name: string;
  price: number;
  sale: number;
  description: string;
  image: string;
  quantity: number;
  category: number;
  rating?: number;
  title_description_1: string;
  title_description_2: string;
  comments: Comment[];
}
export interface Category {
  _id: string;
  category_id: number;
  category_name: string;
}
export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  address: string;
  role: number;
  orders: any[];
  active: number;
}
export interface Comment {
  username_customer: string;
  content: string;
  date: string;
}
