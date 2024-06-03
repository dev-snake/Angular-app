import { Order } from './order';
export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  address: string;
  role: number;
  orders: Order[];
  active: number;
  phonenumber: string;
  success: boolean;
  userId: string;
  message: string;
  point: number;
}
