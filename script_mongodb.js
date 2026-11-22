// ==========================================
//  TAREA 4 - BIG DATA (Caso: Tienda Virtual)
//  Estudiante: Stephany Angel Gómez
// ==========================================

// 1. Conexión y selección de la base de datos
use tienda_virtual;

// 2. Carga masiva de documentos en la colección 'pedidos' (105 registros)
db.pedidos.deleteMany({});
db.pedidos.insertMany(Array.from({length: 105}, (_, i) => ({
    _id: 5000 + i, 
    cliente_id: 1, 
    estado: "entregado", 
    total: 100000
})));

// Verificación del total de documentos insertados en pedidos (Debe retornar 105)
db.pedidos.countDocuments();


// ==========================================
// 3. POBLAMIENTO DE LA COLECCIÓN CLIENTES
// ==========================================
db.clientes.deleteMany({});
db.clientes.insertMany([
  { _id: 1, nombre: "Stephany Gómez", ciudad: "Cali", email: "stephany@correo.com" },
  { _id: 2, nombre: "Carlos Ruiz", ciudad: "Bogotá", email: "carlos@correo.com" },
  { _id: 3, nombre: "Ana Torres", ciudad: "Medellín", email: "ana@correo.com" }
]);


// ==========================================
// 4. OPERACIONES CRUD (Crear, Leer, Actualizar, Borrar)
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
// 5. CONSULTAS AVANZADAS Y DE AGREGACIÓN
// ==========================================

// A. Consulta de Agregación básica (Conteo y suma total por estado)
db.pedidos.aggregate([
  { 
    $group: { 
      _id: "$estado", 
      cantidad_pedidos: { $sum: 1 }, 
      venta_total: { $sum: "$total" } 
    } 
  }
]);

// B. Consulta Relacional con $lookup (Join entre pedidos y clientes)
db.pedidos.aggregate([
  {
    $lookup: {
      from: "clientes",
      localField: "cliente_id",
      foreignField: "_id",
      as: "datos_cliente"
    }
  },
  { $limit: 2 }
]);

// C. Cálculo de estadísticas avanzadas incluyendo el promedio ($avg)
db.pedidos.aggregate([
  {
    $group: {
      _id: "$estado",
      cantidad_pedidos: { $sum: 1 },
      venta_total: { $sum: "$total" },
      promedio_por_pedido: { $avg: "$total" }
    }
  }
]);

// D. Segmentación de clientes y ventas por ciudad (Lookup + Unwind + Group)
db.pedidos.aggregate([
  {
    $lookup: {
      from: "clientes",
      localField: "cliente_id",
      foreignField: "_id",
      as: "cliente"
    }
  },
  { $unwind: "$cliente" },
  {
    $group: {
      _id: "$cliente.ciudad",
      cantidad_pedidos: { $sum: 1 },
      total_vendido: { $sum: "$total" }
    }
  }
]);
