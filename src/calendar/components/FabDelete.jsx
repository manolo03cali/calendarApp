// Importo los hooks personalizados que me permiten acceder al store del calendario y de la interfaz
import { useCalendarStore, useUiStore } from "../../hooks";

// Defino el componente del botón flotante para eliminar eventos
export const FabDelete = () => {
  // Desde el store del calendario, obtengo la función para eliminar eventos
  // y la bandera que me dice si hay un evento seleccionado actualmente
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  // Desde el store de la UI, obtengo la función para cerrar el modal de fecha
  const { closeDateModal } = useUiStore();

  // Esta función se ejecuta cuando hago clic en el botón de eliminar
  const handleClick = () => {
    // Primero, ejecuto la función que borra el evento seleccionado
    startDeletingEvent();
    // Luego, cierro el modal por si está abierto
    closeDateModal();
  };

  // También necesito saber si el modal de fecha está abierto
  const { isDateModalOpen } = useUiStore();

  // Si el modal está abierto, no muestro el botón de eliminar
  if (isDateModalOpen) {
    return null;
  }

  // Renderizo el botón flotante de eliminar.
  // Solo lo muestro si hay un evento seleccionado (usando style.display)
  return (
    <button
      className="btn btn-danger fab-danger" // Le aplico las clases para estilos (por ejemplo, posición fija en pantalla)
      onClick={handleClick} // Le asigno la función que se ejecuta al hacer clic
      style={{ display: hasEventSelected ? "" : "none" }} // Solo lo muestro si hay un evento seleccionado
    >
      <i className="fa fa-trash-alt"></i> {/* Ícono de la papelera */}
    </button>
  );
};
