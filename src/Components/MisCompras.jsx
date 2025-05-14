import React from "react";
import Sidebar from "./Sidebar";
import "../Styles/MisCompras.css";

const compras = [
  { producto: "Onda bb", precio: "$6999", estado: "Entregado" },
  { producto: "Onda Sunset", precio: "$6999", estado: "Pendiente" },
  { producto: "Onda bb", precio: "$6999", estado: "Pendiente" },
];

export default function MisCompras() {
  return (
    <div className="mis-compras-layout"> 
      <Sidebar />
      <div className="mis-compras-container">
        <h2 className="titulo-compras">Mis compras</h2>
        <div className="tabla-contenedor">
          <table className="tabla-compras">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {compras.map((item, index) => (
                <tr key={index}>
                  <td>{item.producto}</td>
                  <td>{item.precio}</td>
                  <td
                    className={
                      item.estado === "Entregado" ? "entregado" : "pendiente"
                    }
                  >
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
