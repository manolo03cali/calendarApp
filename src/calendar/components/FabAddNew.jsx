// Importo la función `addHours` desde date-fns, que me permite sumar horas fácilmente a una fecha
import { addHours } from "date-fns";

// Importo mis hooks personalizados para acceder al estado global del calendario y la interfaz de usuario
import { useCalendarStore, useUiStore } from "../../hooks";

// Defino y exporto el componente `FabAddNew`, que representa el botón flotante para crear un nuevo evento
export const FabAddNew = () => {
  // Desde el store de la interfaz (`UI`), obtengo la función `openDateModal`, que me permite abrir el modal de creación de eventos
  const { openDateModal } = useUiStore();

  // Desde el store del calendario obtengo la función `setActiveEvent`, que me permite establecer el evento que está activo
  const { setActiveEvent } = useCalendarStore();

  // Esta función la ejecuto cuando el usuario hace clic en el botón con el signo "+"
  const handleClick = () => {
    // Primero, preparo un nuevo objeto de evento vacío (o sea, limpio cualquier evento que estuviera seleccionado antes)
    setActiveEvent({
      title: "", // El título empieza vacío
      notes: "", // Las notas también
      start: new Date(), // La fecha de inicio es la hora actual
      end: addHours(new Date(), 2), // La fecha de fin es dos horas después de ahora
      bgColor: "#fafafa", // Color de fondo predeterminado
      user: {
        _id: "123", // Uso un ID de usuario de prueba por ahora
        name: "Manuel", // También pongo un nombre por defecto
      },
      allDay: false, // Este evento no dura todo el día
    });

    // Después de establecer el nuevo evento activo, abro el modal para que el usuario lo edite o complete
    openDateModal();
  };

  // Finalmente, devuelvo el botón flotante en pantalla, con un ícono de "+".
  // Este botón aparece como un círculo azul (gracias a la clase `fab` definida en CSS)
  return (
    <button className="btn btn-primary fab" onClick={handleClick}>
      <i className="fas fa-plus"></i>{" "}
      {/* Ícono de suma que indica que se puede agregar algo nuevo */}
    </button>
  );
};
