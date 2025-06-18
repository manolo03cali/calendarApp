// Defino el componente Navbar que se muestra en la parte superior de la aplicación
export const Navbar = () => {
  return (
    // Creo un contenedor con clases de Bootstrap para que sea un navbar oscuro, con margen abajo y padding horizontal
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      {/* Esta es la parte izquierda del navbar: muestro un ícono de calendario y el nombre del usuario (en este caso, "Manuel") */}
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"> </i>
        &nbsp; Manuel
      </span>

      {/* Este botón es para cerrar sesión. Lo muestro alineado a la derecha del navbar */}
      <button className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        <span>Salir</span>
      </button>
    </div>
  );
};
