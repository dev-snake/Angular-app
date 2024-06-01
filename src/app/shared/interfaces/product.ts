import { Comment } from './comment';
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
  quantityImported: number;
}
