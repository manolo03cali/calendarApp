// Importo `Navigate` para poder redirigir al usuario a otra ruta si ya está autenticado
// Importo `Outlet` para mostrar las rutas hijas dentro de este layout
import { Navigate, Outlet } from "react-router-dom";

// Importo mi hook personalizado que me da acceso al estado de autenticación
import { useAuthStore } from "../hooks";

// Defino el componente `PublicLayout`, que voy a usar como envoltorio para las rutas públicas
export const PublicLayout = () => {
  // Uso el hook `useAuthStore` para obtener el estado de autenticación del usuario
  const { status } = useAuthStore();

  // Si el usuario ya está autenticado, lo redirijo a la ruta principal "/"
  if (status === "authenticated") {
    return <Navigate to="/" replace />;
  }

  // Si no está autenticado, le permito ver las rutas públicas (login, registro, etc.)
  return (
    <div className="container">
      {/* `Outlet` renderiza la ruta hija actual dentro de este layout, como /login o /register */}
      <Outlet />
    </div>
  );
};
