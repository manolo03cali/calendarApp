// Importo `useDispatch` para disparar acciones y `useSelector` para acceder al estado desde Redux
import { useDispatch, useSelector } from "react-redux";

// Importo la instancia de mi API personalizada para hacer peticiones HTTP al backend
import { calendarApi } from "../api";

// Importo las acciones del store relacionadas con la autenticación y calendario
import {
  onChecking, // Acción para indicar que estoy verificando las credenciales
  onLogin, // Acción cuando el login fue exitoso
  onLogout, // Acción cuando quiero cerrar sesión o hubo error
  clearErrorMessage, // Limpia mensajes de error
  onLogoutCalendar, // Limpia el estado del calendario al cerrar sesión
} from "../store";

// Este es mi custom hook para manejar toda la lógica de autenticación
export const useAuthStore = () => {
  // Extraigo el estado actual de autenticación desde Redux
  const { status, user, errorMessage } = useSelector((state) => state.auth);

  // Inicializo `dispatch` para poder lanzar acciones
  const dispatch = useDispatch();

  // Esta función la uso para iniciar sesión
  const startLogin = async ({ email, password }) => {
    dispatch(onChecking()); // Cambio el estado a "verificando"

    try {
      // Hago la petición POST al backend para autenticarme
      const {
        data: { token, name, uid },
      } = await calendarApi.post("/auth", { email, password });

      // Si es exitoso, guardo el token y su fecha de inicio en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", Date.now());

      // Disparo la acción de login con los datos del usuario
      dispatch(onLogin({ name, uid }));
    } catch (error) {
      // Si algo sale mal, disparo logout con un mensaje de error
      dispatch(onLogout("Credenciales incorrectas"));

      // Borro el mensaje de error después de un tiempo muy corto
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  // Esta función la uso para registrar un nuevo usuario
  const startRegister = async ({ name: nombreUsuario, email, password }) => {
    try {
      // Hago una petición POST al backend para crear el usuario
      const {
        data: { token, name, uid },
      } = await calendarApi.post("/auth/new", {
        name: nombreUsuario,
        email,
        password,
      });

      // Guardo token y fecha de inicio
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", Date.now());

      // Disparo el login directamente con los datos del usuario nuevo
      dispatch(onLogin({ name, uid }));
    } catch (error) {
      // Si hay error, muestro el mensaje devuelto por el backend
      dispatch(onLogout(error.response.data?.msg));

      // Limpio el mensaje de error rápidamente para que no quede colgado
      setTimeout(() => {
        dispatch(clearErrorMessage());
      }, 10);
    }
  };

  // Esta función la uso para comprobar si el token aún es válido
  const checkAuthToken = async () => {
    const tokenLocal = localStorage.getItem("token"); // Obtengo el token guardado

    if (!tokenLocal) return dispatch(onLogout()); // Si no hay token, cierro sesión

    dispatch(onChecking()); // Cambio estado a verificando

    try {
      // Hago una petición GET al backend para renovar el token
      const {
        data: { name, uid, token },
      } = await calendarApi.get("/auth/renew");

      // Si renueva con éxito, guardo el nuevo token y fecha
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", Date.now());

      // Disparo login con los datos del usuario
      dispatch(onLogin({ name, uid }));
    } catch (error) {
      // Si hay error, limpio localStorage y disparo logout
      console.error("Error al renovar token:", error);
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  // Esta función la uso para cerrar sesión completamente
  const startLogout = () => {
    localStorage.removeItem("token"); // Borro el token
    localStorage.removeItem("token-init-date"); // Borro la fecha
    dispatch(onLogoutCalendar()); // Limpio estado del calendario
    dispatch(onLogout()); // Limpio estado de autenticación
  };

  // Devuelvo todas las propiedades y funciones que necesito usar en los componentes
  return {
    // Estado
    errorMessage,
    status,
    user,

    // Métodos
    startLogin,
    startRegister,
    checkAuthToken,
    startLogout,
  };
};
