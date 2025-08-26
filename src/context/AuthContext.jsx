import React, { createContext, useContext, useState, useEffect } from "react";
import AuthService from "../Service/AuthService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(!!localStorage.getItem("user"));

  useEffect(() => {
    // Chequea el login al montar
    AuthService.isLoggedIn().then(setIsLogged);

    // Escucha cambios en localStorage (por ejemplo, desde otras pestañas)
    const onStorage = () => {
      setIsLogged(!!localStorage.getItem("user"));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}