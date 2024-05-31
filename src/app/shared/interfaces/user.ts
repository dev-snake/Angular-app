import { Order } from './order';
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
