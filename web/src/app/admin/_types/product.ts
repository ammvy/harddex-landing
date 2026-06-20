export interface Product {
  id: number;
  name: string;
  description: string | null;
  averagePrice: number | null;
  brandId: number | null;
  categoryId: number | null;
}
