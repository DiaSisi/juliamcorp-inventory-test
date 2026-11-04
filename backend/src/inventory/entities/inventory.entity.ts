export class Inventory {
  id: string; // SKU o ID único
  name: string; // Descripción del producto
  category: string; // Plástico, Vidrio, etc.
  uom: string; // Unidad de Medida (Caja, Paquete)
  physicalStock: number; // Stock Físico Real
  committedStock: number; // Stock Comprometido (vendido pero no entregado)
  availableStock: number; // Stock Disponible (físico - comprometido)
  reorderPoint: number; // Nivel de alerta mínima
}