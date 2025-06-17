// Importo useSelector para acceder al estado global de Redux
//import { useSelector } from "react-redux";
// Importo Navigate para redirigir y Outlet para renderizar rutas hijas con React Router
import { Navigate, Outlet } from "react-router-dom";

// Defino el componente PublicLayout, que será el diseño para rutas públicas (login, registro, etc.)
export const PublicLayout = () => {
  // Obtengo el estado "status" del slice "auth" para saber si el usuario está autenticado
  //const { status } = useSelector((state) => state.auth);
  const status = "autenticated";
  // Si el usuario ya está autenticado, no quiero que entre a rutas públicas,
  // por eso lo redirijo directamente a la página principal del  "/calendar"
  if (status === "authenticated") {
    return <Navigate to="/calendar" replace />;
  }

  // Si el usuario NO está autenticado, le muestro el layout público con las rutas hijas (login, registro, etc.)
  return (
    <div className="container">
      {/* Aquí renderizo las rutas hijas definidas en el enrutador */}
      <Outlet />
    </div>
  );
};
