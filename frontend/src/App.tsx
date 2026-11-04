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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: '', name: '', category: '', uom: '', 
    physicalStock: 0, committedStock: 0, reorderPoint: 0
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      physicalStock: Number(formData.physicalStock),
      committedStock: Number(formData.committedStock),
      reorderPoint: Number(formData.reorderPoint),
    };

    if (editingId) {
      await fetch(`http://localhost:3000/inventory/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      setEditingId(null);
    } else {
      await fetch('http://localhost:3000/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    }
    
    setFormData({ id: '', name: '', category: '', uom: '', physicalStock: 0, committedStock: 0, reorderPoint: 0 });
    fetchInventory();
  };

  const handleEdit = (item: InventoryItem) => {
    setFormData({ ...item });
    setEditingId(item.id);
  };

  const handleDelete = async (id: string) => {
    await fetch(`http://localhost:3000/inventory/${id}`, { method: 'DELETE' });
    fetchInventory();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '1200px', margin: '0 auto' }}>

      {/* Header */}
      <div style={{ borderBottom: '2px solid #eaeaea', paddingBottom: '15px', marginBottom: '25px' }}>
        <h1 style={{ margin: '0 0 5px 0', display: 'flex', alignItems: 'center', gap: '10px', color: '#2c3e50' }}>
          📦 Panel de Inventario
        </h1>
        <h3 style={{ margin: 0, color: '#7f8c8d', fontWeight: '500' }}>Juliam Corp</h3>
      </div>

      <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', marginBottom: '20px', color: '#333' }}>
        <h3 style={{ marginTop: 0 }}>{editingId ? 'Editar Producto' : 'Registrar Nuevo Producto'}</h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>SKU (Código)</label>
            <input type="text" required disabled={!!editingId} value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} style={{ padding: '6px', width: '100px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>Nombre del Producto</label>
            <input type="text" list="nombres-list" required placeholder="Ej. Cajas de Cartón" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ padding: '6px', width: '160px' }} />
            <datalist id="nombres-list">
              <option value="Cajas de Cartón" />
              <option value="Cinta Adhesiva" />
              <option value="Plástico Burbuja" />
              <option value="Etiquetas Térmicas" />
              <option value="Pallets de Madera" />
            </datalist>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>Categoría</label>
            <input type="text" list="categorias-list" required placeholder="Ej. Empaque" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ padding: '6px', width: '120px' }} />
            <datalist id="categorias-list">
              <option value="Empaque" />
              <option value="Materia Prima" />
              <option value="Herramientas" />
              <option value="Electrónica" />
              <option value="Limpieza" />
            </datalist>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>U/M</label>
            <input type="text" list="uom-list" required placeholder="Ej. Unidad" value={formData.uom} onChange={e => setFormData({...formData, uom: e.target.value})} style={{ padding: '6px', width: '90px' }} />
            <datalist id="uom-list">
              <option value="Unidad" />
              <option value="Caja" />
              <option value="Paquete" />
              <option value="Kg" />
              <option value="Litro" />
            </datalist>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>Físico</label>
            <input type="number" required min="0" value={formData.physicalStock} onChange={e => setFormData({...formData, physicalStock: Number(e.target.value)})} style={{ padding: '6px', width: '70px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>Comprometido</label>
            <input type="number" required min="0" value={formData.committedStock} onChange={e => setFormData({...formData, committedStock: Number(e.target.value)})} style={{ padding: '6px', width: '90px' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '5px' }}>Reorden</label>
            <input type="number" required min="0" value={formData.reorderPoint} onChange={e => setFormData({...formData, reorderPoint: Number(e.target.value)})} style={{ padding: '6px', width: '70px' }} />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={{ background: editingId ? '#2196F3' : '#4CAF50', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer', borderRadius: '4px', height: '32px' }}>
              {editingId ? 'Actualizar' : 'Agregar'}
            </button>
            
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({ id: '', name: '', category: '', uom: '', physicalStock: 0, committedStock: 0, reorderPoint: 0 }); }} style={{ background: '#9e9e9e', color: 'white', border: 'none', padding: '8px 16px', cursor: 'pointer', borderRadius: '4px', height: '32px' }}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <table border={1} cellPadding={12} style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventory.length === 0 ? (
            <tr><td colSpan={9} style={{ textAlign: 'center' }}>No hay productos registrados en el almacén.</td></tr>
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
                  <span style={{ color: item.availableStock <= item.reorderPoint ? 'red' : 'green', fontWeight: 'bold' }}>
                    {item.availableStock}
                  </span>
                </td>
                <td>{item.reorderPoint}</td>
                <td style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleEdit(item)} style={{ background: '#2196F3', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px' }}>Editar</button>
                  <button onClick={() => handleDelete(item.id)} style={{ background: '#f44336', color: 'white', border: 'none', padding: '6px 12px', cursor: 'pointer', borderRadius: '4px' }}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;