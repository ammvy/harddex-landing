export interface Component {
  id: number;
  name: string;
  specification: Record<string, any> | null;
  description: string | null;
  averagePrice: number | null;
  productId: number;
  typeId: number | null;
  manufacturerId: number | null;
}
