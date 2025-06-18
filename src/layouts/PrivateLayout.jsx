// Importo `Navigate` para poder redirigir al usuario a otra ruta si no cumple alguna condición
// Importo `Outlet` para poder renderizar las rutas hijas dentro de este layout
import { Navigate, Outlet } from "react-router-dom";

// Defino el componente `PrivateLayout`, que me permite proteger rutas privadas (solo accesibles si el usuario está autenticado)
export const PrivateLayout = () => {
  // En una app real, aquí debería obtener el estado de autenticación desde el store de Redux:
  // const { status } = useSelector((state) => state.auth);

  // Por ahora lo tengo fijo como "authenticated" para pruebas
  const status = "authenticated";

  // Si el estado indica que el usuario NO está autenticado, redirijo al login
  if (status !== "authenticated") {
    // Redirijo a /login y uso `replace` para que no se guarde esta redirección en el historial
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está autenticado, entonces muestro el contenido protegido
  return (
    <>
      <div className="container">
        {/* `Outlet` se encarga de renderizar la ruta hija actual dentro de este layout */}
        <Outlet />
      </div>
    </>
  );
};
