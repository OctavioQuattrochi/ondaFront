import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthService from "../../Service/AuthService";

export default function Profile() {
  const navigate = useNavigate();
  const { setIsLogged } = useAuth();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = async () => {
    await AuthService.logout();
    setIsLogged(false);
    navigate("/login");
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div style={{
      maxWidth: 400,
      margin: "3rem auto",
      background: "#222",
      color: "#fff",
      borderRadius: 12,
      padding: "2rem",
      textAlign: "center"
    }}>
      <h2>Mi perfil</h2>
      <div style={{ margin: "1.5rem 0" }}>
        <b>Usuario:</b>
        <div style={{ marginTop: 8, fontSize: "1.1rem" }}>
          {user?.name || user?.email || "Sin datos"}
        </div>
      </div>
      <button
        onClick={handleLogout}
        style={{
          background: "#a95ff7",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          padding: "0.7rem 2rem",
          fontWeight: "bold",
          cursor: "pointer",
          fontSize: "1rem"
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
}