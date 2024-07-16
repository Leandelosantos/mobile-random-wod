import { useNavigation } from "@react-navigation/native";
import React, { createContext, useState, useContext } from "react";

// Creamos el contexto de autenticación
const AuthContext = createContext();

// Creamos un componente proveedor que envuelve la aplicación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para almacenar la información del usuario autenticado
  const navigation = useNavigation();

  // Función para realizar la autenticación del usuario
  const signIn = async (username, password) => {
    // Aquí puedes realizar la lógica de autenticación, por ejemplo, consultar una base de datos
    // En este ejemplo, comparamos las credenciales con un usuario predeterminado
    if (username === "Usuario" && password === "1234") {
      setUser({ username }); // Autenticación exitosa, almacenamos el usuario en el estado
    } else {
      alert("Usuario y/o contraseña inválidos");
    }
  };

  // Función para cerrar sesión
  const signOut = () => {
    setUser(null); // Limpiamos el usuario del estado
    navigation.navigate("Login");
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);
