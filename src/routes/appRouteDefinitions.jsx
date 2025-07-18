// Importo el layout principal de la aplicación. Este se encarga de validar si el usuario está autenticado.
// Si el estado de autenticación está en "checking", muestra un loader. Si está autenticado, continúa con la navegación.
import { RootLayout } from "../layouts";

// Importo las rutas privadas. Estas rutas solo deben ser accesibles por usuarios autenticados.
// Ejemplos típicos: calendario, perfil, dashboard, etc.
import { privateRoutes } from "./privateRoutes";

// Importo las rutas públicas. Estas están disponibles para cualquier usuario, autenticado o no.
// Ejemplos típicos: /login, /register.
import { publicRoutes } from "./publicRoutes";

// Defino un arreglo con todas las rutas principales de la aplicación.
// Aquí establezco que la ruta raíz "/" usará el componente RootLayout como envoltorio general.
export const appRouteDefinitions = [
  {
    path: "/", // Esta es la ruta base del sitio, es decir, el dominio raíz
    element: <RootLayout />, // Uso el RootLayout como componente padre. Dentro de él se renderizarán sus rutas hijas.
    children: [
      // Aquí uno (con spread operator ...) las rutas públicas y privadas en una sola lista.
      // Esto permite que RootLayout determine qué rutas renderizar dependiendo del estado de autenticación del usuario.
      ...publicRoutes,
      ...privateRoutes,
    ],
  },
];
