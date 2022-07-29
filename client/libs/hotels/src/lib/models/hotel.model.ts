export interface Hotel {
  _id?: string;
  name: string;
  type: string;
  city: string;
  address: string;
  distance: string;
  description: string;
  photos?: string[];
  rating?: string;
  rooms?: string[];
  cheapestPrice: number;
  isFeatured?: boolean;
}
