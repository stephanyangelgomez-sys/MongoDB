// ==========================================
//  TAREA 4 - BIG DATA 
// Base de datos: tienda_virtual
// Colección: pedidos
// ==========================================

// 1. Conexión y selección de la base de datos
use tienda_virtual;

// 2. Limpieza previa de la colección (opcional) y carga masiva de los 105 documentos
db.pedidos.deleteMany({});
db.pedidos.insertMany(Array.from({length: 105}, (_, i) => ({
    _id: 5000 + i, 
    cliente_id: 1, 
    estado: "entregado", 
    total: 100000
})));

// Verificación del total de documentos insertados (Debe retornar 105)
db.pedidos.countDocuments();


// ==========================================
// 3. OPERACIONES CRUD (Crear, Leer, Actualizar, Borrar)
// ==========================================

// Inserción de un documento individual (insertOne)
db.pedidos.insertOne({ 
    _id: 9999, 
    cliente_id: 1, 
    estado: "pendiente", 
    total: 250000 
});

// Selección / Búsqueda de un documento específico (findOne)
db.pedidos.findOne({ _id: 9999 });

// Actualización del estado del documento (updateOne)
db.pedidos.updateOne(
    { _id: 9999 }, 
    { $set: { estado: "entregado" } }
);

// Eliminación del documento de prueba (deleteOne)
db.pedidos.deleteOne({ _id: 9999 });


// ==========================================
// 4. CONSULTA DE AGREGACIÓN (Estadísticas)
// ==========================================

// Agrupar por estado para obtener el conteo y la suma total de ventas
db.pedidos.aggregate([
  { 
    $group: { 
      _id: "$estado", 
      cantidad_pedidos: { $sum: 1 }, 
      venta_total: { $sum: "$total" } 
    } 
  }
]);
