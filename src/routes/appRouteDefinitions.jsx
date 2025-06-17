// Primero importo el layout raíz de mi aplicación, que probablemente maneja la lógica de autenticación,
// como verificar si el usuario está logueado, mostrar un loader mientras se valida, y luego permitir el acceso a las rutas.
import { RootLayout } from "../layouts";

// Luego importo las rutas privadas, que están destinadas a usuarios autenticados
// (por ejemplo, dashboard, perfil, etc.).
import { privateRoutes } from "./privateRoutes";

// También importo las rutas públicas, como login o registro, que no requieren autenticación.
import { publicRoutes } from "./publicRoutes";

// Ahora defino todas las rutas principales de la app.
// Le indico que la ruta raíz `/` va a usar el `RootLayout`, que envolverá a todas las rutas hijas.
export const appRouteDefinitions = [
  {
    path: "/", // Esto representa la raíz del sitio
    element: <RootLayout />, // Aquí uso el layout raíz como contenedor principal
    children: [
      // Combino (spread) todas las rutas públicas y privadas bajo este layout.
      // De esta manera, `RootLayout` podrá decidir qué mostrar dependiendo del estado de autenticación.
      ...publicRoutes,
      ...privateRoutes,
    ],
  },
];
