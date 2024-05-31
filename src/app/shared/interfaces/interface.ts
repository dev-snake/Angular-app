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
  views: number;
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
  firstname: string;
  lastname: string;
  address: string;
  role: string;
  orders: Order[];
  active: number;
  phonenumber: string;
}
export interface Comment {
  username_customer: string;
  content: string;
  date: string;
}
export interface OrderHistory {
  code: string;
  date: string;
  status: Number;
}
export interface Order {
  _id: string;
  userId: string;
  status: Number;
  total: Number;
  date: string;
  paymentMethod: string;
  address: string;
  phone: string;
  email: string;
  userOrder: string;
  code: string;
}
