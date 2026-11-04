import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';

@Injectable()
export class InventoryService {
  // simulación de una base de datos en memoria para propósitos de demostración
  private inventoryList: Inventory[] = [];

  create(createInventoryDto: CreateInventoryDto) {
    const newItem: Inventory = {
      ...createInventoryDto,
      // el stock disponible se calcula automáticamente
      availableStock: createInventoryDto.physicalStock - createInventoryDto.committedStock,
    };
    
    this.inventoryList.push(newItem);
    return newItem;
  }

  findAll() {
    return this.inventoryList;
  }

  findOne(id: string) {
    const item = this.inventoryList.find((i) => i.id === id);
    if (!item) throw new NotFoundException(`Producto ${id} no encontrado`);
    return item;
  }

  update(id: string, updateInventoryDto: UpdateInventoryDto) {
    const index = this.inventoryList.findIndex((i) => i.id === id);
    if (index === -1) throw new NotFoundException(`Producto ${id} no encontrado`);
    
    const updatedItem = { ...this.inventoryList[index], ...updateInventoryDto };
    // recalcular el stock disponible después de la actualización
    updatedItem.availableStock = updatedItem.physicalStock - updatedItem.committedStock;
    
    this.inventoryList[index] = updatedItem;
    return updatedItem;
  }

  remove(id: string) {
    this.inventoryList = this.inventoryList.filter((i) => i.id !== id);
    return { message: `Producto ${id} eliminado` };
  }
}