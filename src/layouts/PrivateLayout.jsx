// Importo `Navigate` para redirigir al usuario si no está autorizado
// Importo `Outlet` para renderizar las rutas hijas en este layout
import { Navigate, Outlet } from "react-router-dom";

// Importo mi hook personalizado que accede al estado de autenticación desde Redux
import { useAuthStore } from "../hooks";

// Defino el componente `PrivateLayout`, que me ayuda a proteger rutas privadas
export const PrivateLayout = () => {
  // Uso mi hook `useAuthStore` para saber si el usuario está autenticado
  const { status } = useAuthStore();

  // Si el usuario no está autenticado, lo redirijo a la página de login
  if (status !== "authenticated") {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario sí está autenticado, entonces le muestro las rutas hijas (contenido protegido)
  return (
    <>
      <div className="container">
        {/* Outlet representa donde se van a renderizar las rutas hijas definidas en `Routes` */}
        <Outlet />
      </div>
    </>
  );
};
