import React from "react";
import Sidebar from "../Shared/Sidebar";
import "../../Styles/Client/MisCompras.css";


const presupuestos = [
  { id: 1, detalle: "Corazon rojo", precio: "$3999", estado: "Entregado" },
  { id: 2, detalle: "Lomito amarillo", precio: "$------", estado: "Pendiente" },
  { id: 3, detalle: "Flecha azul", precio: "$------", estado: "Pendiente" },
];

export default function MisPresupuestos() {
  return (
    <div className="mis-compras-layout">
      <Sidebar />
      <div className="mis-compras-container">
        <h2 className="titulo-compras">Mis presupuestos</h2>
        <div className="tabla-contenedor">
          <table className="tabla-compras">
            <thead>
              <tr>
                <th>Personalizado</th>
                <th>Detalle</th>
                <th>Precio</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {presupuestos.map((item, index) => (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.detalle}</td>
                  <td>{item.precio}</td>
                  <td className={item.estado === "Entregado" ? "entregado" : "pendiente"}>
                    {item.estado}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
