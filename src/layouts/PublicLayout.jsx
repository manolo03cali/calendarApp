// Importo Navigate para poder redirigir a otra ruta si el usuario ya está autenticado
// Importo Outlet para poder mostrar las rutas hijas (como login o registro)
import { Navigate, Outlet } from "react-router-dom";

// Defino el componente PublicLayout, que voy a usar para envolver las rutas públicas (como /login o /register)
export const PublicLayout = () => {
  // Aquí normalmente usaría useSelector para acceder al estado de autenticación desde Redux:
  // const { status } = useSelector((state) => state.auth);

  // Por ahora, estoy usando un valor simulado para pruebas
  const status = "authenticated";

  // Si el usuario ya está autenticado, no debería acceder a rutas públicas (como login o register)
  // Entonces lo redirijo automáticamente al calendario (ruta protegida)
  if (status === "authenticated") {
    return <Navigate to="/calendar" replace />;
  }

  // Si el usuario NO está autenticado, le muestro las rutas públicas (ej: LoginPage o RegisterPage)
  return (
    <div className="container">
      {/* Outlet sirve para renderizar el componente correspondiente a la ruta hija actual */}
      <Outlet />
    </div>
  );
};
