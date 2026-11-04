import { useEffect, useState } from 'react';

interface InventoryItem {
  id: string;
  name: string;
  category: string;
  uom: string;
  physicalStock: number;
  committedStock: number;
  availableStock: number;
  reorderPoint: number;
}

function App() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);

  const fetchInventory = async () => {
    try {
      const response = await fetch('http://localhost:3000/inventory');
      const data = await response.json();
      setInventory(data);
    } catch (error) {
      console.error('Error conectando con el backend:', error);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>📦 Panel de Inventario Central - Juliam Corp</h1>
      
      <table border={1} cellPadding={12} style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead style={{ backgroundColor: '#242424', color: 'white' }}>
          <tr>
            <th>SKU</th>
            <th>Producto</th>
            <th>Categoría</th>
            <th>U/M</th>
            <th>Físico</th>
            <th>Comprometido</th>
            <th>Disponible</th>
            <th>Punto Reorden</th>
          </tr>
        </thead>
        <tbody>
          {inventory.length === 0 ? (
            <tr>
              <td colSpan={8} style={{ textAlign: 'center' }}>No hay productos registrados en el almacén.</td>
            </tr>
          ) : (
            inventory.map((item) => (
              <tr key={item.id}>
                <td><strong>{item.id}</strong></td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.uom}</td>
                <td>{item.physicalStock}</td>
                <td>{item.committedStock}</td>
                <td>
                  {}
                  <span style={{ 
                    color: item.availableStock <= item.reorderPoint ? 'red' : 'green',
                    fontWeight: 'bold' 
                  }}>
                    {item.availableStock}
                  </span>
                </td>
                <td>{item.reorderPoint}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;