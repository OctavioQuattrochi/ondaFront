import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Inicializa isLogged según si hay un usuario en localStorage
  const [isLogged, setIsLogged] = useState(() => {
    const user = localStorage.getItem("user");
    return !!user;
  });

  // Si cambia el usuario en localStorage, actualiza isLogged
  useEffect(() => {
    const checkUser = () => {
      const user = localStorage.getItem("user");
      setIsLogged(!!user);
    };

    // Escucha cambios manuales en localStorage (por ejemplo, logout en otra pestaña)
    window.addEventListener("storage", checkUser);

    // Chequea al montar el componente
    checkUser();

    return () => {
      window.removeEventListener("storage", checkUser);
    };
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