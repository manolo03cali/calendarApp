// Primero importo la función `createBrowserRouter` desde React Router.
// Esta función me permite crear un enrutador que se basa en el historial del navegador (como cuando el usuario usa el botón "atrás").
import { createBrowserRouter } from "react-router-dom";

// Luego importo las definiciones de las rutas de mi aplicación.
// Estas rutas las tengo definidas en otro archivo como un arreglo de objetos.
// Cada objeto representa una ruta (con su path, componente, hijos, etc.).
import { appRouteDefinitions } from "./appRouteDefinitions";

// Ahora creo el enrutador principal para mi app usando `createBrowserRouter`.
// Le paso las rutas que importé, y con eso el enrutador ya sabe cómo debe comportarse
// dependiendo de la URL actual (por ejemplo, si estoy en `/login`, muestra el LoginPage).
export const AppRouter = createBrowserRouter(appRouteDefinitions);
