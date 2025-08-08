// Primero importo el layout privado (`PrivateLayout`) que se encarga de proteger las rutas.
// Este componente solo deja pasar a los usuarios autenticados.
import { PrivateLayout } from "../layouts";

// Luego importo la página principal del calendario. Esta es la funcionalidad principal
// que quiero proteger para que solo esté disponible cuando el usuario ha iniciado sesión.
import { CalendarPage } from "../calendar";

// También importo una página de error, por si el usuario intenta entrar a una ruta privada que no existe.
import { ErrorPage } from "../auth";

// Ahora defino un arreglo con todas las rutas privadas de la aplicación.
// Estas rutas estarán protegidas por el `PrivateLayout`, que se encargará de redirigir al login
// si el usuario no está autenticado.
export const privateRoutes = [
  {
    // Uso el `PrivateLayout` como componente principal (envoltorio) para todas las rutas privadas.
    element: <PrivateLayout />,

    // Dentro de este layout, defino todas las rutas hijas que quiero proteger.
    children: [
      // Esta ruta se activa cuando el usuario navega a la raíz "/".
      // Gracias a `index: true`, React Router sabe que debe cargar esta ruta por defecto.
      // Aquí muestro la página del calendario, que es la funcionalidad central de mi app.
      { index: true, element: <CalendarPage /> },

      // Esta ruta captura cualquier otra ruta no definida dentro del contexto privado (usando el comodín "*").
      // Si alguien escribe mal una URL o accede a una ruta inexistente, muestro la página de error.
      { path: "*", element: <CalendarPage /> },
    ],
  },
];
