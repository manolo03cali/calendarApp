// Primero, importo Axios, que es la librería que voy a usar para hacer peticiones HTTP
import axios from "axios";

// Luego importo una función que me ayuda a obtener las variables de entorno (como la URL base de la API)
import { getEnvVariables } from "../helpers";

// Extraigo la URL base de la API desde las variables de entorno
const { VITE_API_URL } = getEnvVariables();

// Ahora creo una instancia personalizada de Axios que usará la URL base que definí antes
const calendarApi = axios.create({
  baseURL: VITE_API_URL, // Aquí le digo que todas las peticiones van a empezar con esta URL
});

// A continuación configuro un interceptor de peticiones.
// Es decir, antes de que cada petición salga al servidor, le agrego algo.
calendarApi.interceptors.request.use((config) => {
  // Aquí accedo a los headers de la configuración de la petición y le agrego el token.
  // Esto es útil porque mi backend probablemente requiere autenticación.
  config.headers = {
    ...config.headers, // Mantengo los headers anteriores
    "x-token": localStorage.getItem("token"), // Agrego un header personalizado con el token del usuario
  };

  // Finalmente retorno la configuración modificada para que Axios la use
  return config;
});

// Exporto esta instancia ya configurada para usarla en cualquier parte del proyecto
export default calendarApi;
