// Importo la función `addHours` para sumar horas a una fecha
import { addHours } from "date-fns";

// Importo mis hooks personalizados que me permiten acceder al store de calendario y UI
import { useCalendarStore, useUiStore } from "../../hooks";

// Defino el botón flotante para agregar un nuevo evento al calendario
export const FabAddNew = () => {
  // Desde el store de la UI, obtengo la función que abre el modal de fecha
  const { openDateModal } = useUiStore();

  // Desde el store del calendario, obtengo la función que establece el evento activo
  const { setActiveEvent } = useCalendarStore();

  // Esta función se ejecuta cuando el usuario hace clic en el botón "+"
  const handleClick = () => {
    // Primero, reseteo cualquier evento que estuviera seleccionado
    // y defino un nuevo evento vacío con valores por defecto
    setActiveEvent({
      title: "", // Título vacío
      notes: "", // Notas vacías
      start: new Date(), // Fecha de inicio: ahora
      end: addHours(new Date(), 2), // Fecha de fin: 2 horas después
      bgColor: "#fafafa", // Color de fondo por defecto
      user: {
        _id: "123", // ID de usuario quemado (en pruebas)
        name: "Manuel", // Nombre del usuario
      },
      allDay: false, // No es un evento de todo el día
    });

    // Luego abro el modal para que el usuario pueda llenar los datos del nuevo evento
    openDateModal();
  };

  // Renderizo el botón flotante azul con el ícono "+"
  return (
    <button className="btn btn-primary fab" onClick={handleClick}>
      <i className="fas fa-plus"></i> {/* Ícono de suma */}
    </button>
  );
};
