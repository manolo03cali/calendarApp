// Importo el layout público que usaré para las rutas accesibles sin autenticación
import { PublicLayout } from "../layouts";
// Importo las páginas de autenticación: login y página de error
import { LoginPage, ErrorPage } from "../auth";

// Defino las rutas públicas de mi aplicación
export const publicRoutes = [
  {
    // Uso PublicLayout como contenedor principal para estas rutas públicas
    element: <PublicLayout />,
    children: [
      // Cuando la ruta sea la raíz "/", muestro la página de login
      { path: "/", element: <LoginPage /> },

      // Ruta explícita para login, también muestra la página de login
      { path: "login", element: <LoginPage /> },
    ],
  },
];
