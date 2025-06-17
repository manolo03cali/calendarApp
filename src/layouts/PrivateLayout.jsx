// Importo useSelector para acceder al estado global de Redux
//import { useSelector } from "react-redux";
// Importo Navigate para redirigir y Outlet para renderizar rutas hijas en React Router
import { Navigate, Outlet } from "react-router-dom";

// Defino el componente PrivateLayout que sirve para proteger rutas privadas
export const PrivateLayout = () => {
  // Obtengo el estado "status" del slice "auth" desde Redux para saber si el usuario está autenticado
  // const { status } = useSelector((state) => state.auth);
  const status = "authenticated";

  // Si el usuario NO está autenticado, lo redirijo a la página de login
  if (status !== "authenticated") {
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está autenticado, muestro el contenido de las rutas hijas dentro de un contenedor
  return (
    <>
      <div className="container">
        {/* Outlet sirve para renderizar el componente correspondiente a la ruta hija */}
        <Outlet />
      </div>
    </>
  );
};
