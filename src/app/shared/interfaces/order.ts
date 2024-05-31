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
