export interface Voucher {
  _id: string;
  code: string;
  discount: any;
  description: string;
  expiredDate: string;
  status: number;
  createdAt: string;
  limitQuantity: number;
  quantityUsed: number;
}
