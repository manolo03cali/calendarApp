// Importo el componente CheckingAuth, que muestra un indicador mientras verifico el estado de autenticación
//import { CheckingAuth } from "../ui";
// Importo Outlet para renderizar las rutas hijas definidas en el router
import { Outlet } from "react-router-dom";
// Importo un hook personalizado que verifica el estado de autenticación
//import { useCheckAuth } from "../hooks";

// Defino el componente RootLayout, que maneja la estructura raíz de mi aplicación
export const RootLayout = () => {
  // Uso el hook useCheckAuth para obtener el estado actual de autenticación (loading, authenticated, etc.)
  //const { status } = useCheckAuth();

  // Mientras el estado sea "checking" (es decir, mientras verifico si el usuario está autenticado)
  // muestro el componente CheckingAuth, que puede ser un spinner o indicador de carga
  // if (status === "checking") {
  //   return <CheckingAuth />;
  // }

  // Cuando ya sé el estado (no está en proceso de verificación), renderizo las rutas hijas con Outlet
  return <Outlet />;
};
