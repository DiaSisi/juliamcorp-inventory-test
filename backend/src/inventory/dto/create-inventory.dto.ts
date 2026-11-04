export class CreateInventoryDto {
    id: string;
  name: string;
  category: string;
  uom: string;
  physicalStock: number;
  committedStock: number;
  reorderPoint: number;
}

