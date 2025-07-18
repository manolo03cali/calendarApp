// Primero importo el `PublicLayout`, que va a envolver todas las rutas que están disponibles
// sin necesidad de estar autenticado (como login o error).
import { PublicLayout } from "../layouts";

// Luego importo las páginas que van dentro de estas rutas públicas:
// - `LoginPage` es la página para iniciar sesión.
// - `ErrorPage` se muestra cuando el usuario intenta acceder a una ruta no válida.
import { LoginPage, ErrorPage } from "../auth";

// Ahora defino un arreglo con todas las rutas públicas de la aplicación.
// Estas rutas serán accesibles incluso si el usuario no ha iniciado sesión.
export const publicRoutes = [
  {
    // Este `element` indica que todas estas rutas estarán envueltas por el `PublicLayout`,
    // el cual se encarga de verificar que el usuario NO esté autenticado.
    element: <PublicLayout />,

    // Dentro de este layout, defino las rutas hijas públicas.
    children: [
      // Esta ruta se activa cuando el usuario va a `/login`.
      // Allí muestro la página para iniciar sesión.
      { path: "login", element: <LoginPage /> },

      // Esta ruta actúa como catch-all: si el usuario intenta acceder a una ruta pública que no existe,
      // le muestro la `ErrorPage`.
      { path: "*", element: <ErrorPage /> },
    ],
  },
];
