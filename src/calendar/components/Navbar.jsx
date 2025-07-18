// Importo mi hook personalizado `useAuthStore` para acceder al estado de autenticación (usuario y funciones como logout)
import { useAuthStore } from "../../hooks";

// Defino y exporto el componente `Navbar`, que representa la barra superior de la aplicación
export const Navbar = () => {
  // Desde el store de autenticación obtengo:
  // - el usuario actualmente autenticado (`user`)
  // - y la función `startLogout`, que me permite cerrar la sesión
  const { user, startLogout } = useAuthStore();

  return (
    // Renderizo un contenedor con clases de Bootstrap:
    // - `navbar`: lo convierte en una barra de navegación
    // - `navbar-dark bg-dark`: le da estilo oscuro
    // - `mb-4 px-4`: margen inferior y padding horizontal
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      {/* En el lado izquierdo del navbar muestro: 
          - un ícono de calendario
          - el nombre del usuario (si existe), o "Invitado" si no hay sesión activa */}
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"> </i>
        &nbsp; {user?.name || "Invitado"}
      </span>

      {/* En el lado derecho, coloco un botón de cerrar sesión:
          - Al hacer clic, ejecuto la función `startLogout`
          - Le doy estilo de Bootstrap (`btn-outline-danger`) para que se vea como un botón de advertencia (borde rojo) */}
      <button onClick={startLogout} className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i> {/* Ícono de cerrar sesión */}
        &nbsp;
        <span>Salir</span> {/* Texto del botón */}
      </button>
    </div>
  );
};
