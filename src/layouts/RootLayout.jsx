// Importo `useEffect` para ejecutar un efecto cuando el componente se monta
import { useEffect } from "react";

// Importo `Outlet` para renderizar rutas hijas dentro del layout
import { Outlet } from "react-router-dom";

// Importo mi hook personalizado que maneja el estado de autenticación
import { useAuthStore } from "../hooks";

// Defino el componente RootLayout
export const RootLayout = () => {
  // Extraigo el estado de autenticación y la función que verifica el token
  const { status, checkAuthToken } = useAuthStore();

  // Cuando el componente se monta por primera vez, ejecuto `checkAuthToken`
  // Esto sirve para revisar si hay un token en localStorage y validar la sesión del usuario
  useEffect(() => {
    checkAuthToken();
  }, []); // El arreglo vacío hace que esto solo se ejecute una vez (al montar)

  // Si la verificación aún está en proceso, muestro un mensaje de "Cargando..."
  if (status === "checking") {
    return <h3>Cargando...</h3>;
  }

  // Si ya se verificó el estado de autenticación, renderizo las rutas hijas
  return <Outlet />;
};
