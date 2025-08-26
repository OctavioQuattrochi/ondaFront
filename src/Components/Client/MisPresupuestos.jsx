import React, { useEffect, useState } from "react";
import "../../Styles/Client/MisCompras.css";
import AuthService from "../../Service/AuthService";

export default function MisPresupuestos() {
  const [presupuestos, setPresupuestos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AuthService.getQuotes()
      .then((data) => {
        // Asegura que presupuestos siempre sea un array
        if (Array.isArray(data)) {
          setPresupuestos(data);
        } else if (Array.isArray(data.data)) {
          setPresupuestos(data.data);
        } else if (Array.isArray(data.quotes)) {
          setPresupuestos(data.quotes);
        } else {
          setPresupuestos([]);
        }
      })
      .catch(() => setPresupuestos([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mis-compras-container">
      <h2 className="titulo-compras">Mis presupuestos</h2>
      <div className="tabla-contenedor">
        <table className="tabla-compras">
          <thead>
            <tr>
              <th>ID</th>
              <th>Detalle</th>
              <th>Precio</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4}>Cargando...</td>
              </tr>
            ) : Array.isArray(presupuestos) && presupuestos.length === 0 ? (
              <tr>
                <td colSpan={4}>No tienes presupuestos aún.</td>
              </tr>
            ) : (
              Array.isArray(presupuestos) &&
              presupuestos.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>
                    {item.color} - {item.height_cm}x{item.width_cm}cm
                  </td>
                  <td>
                    {item.estimated_price
                      ? `$${Number(item.estimated_price).toLocaleString("es-AR")}`
                      : "$------"}
                  </td>
                  <td className="pendiente">Pendiente</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
