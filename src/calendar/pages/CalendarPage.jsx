// Importo el componente principal `Calendar` desde react-big-calendar
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css"; // Importo los estilos por defecto del calendario

// Importo los componentes internos de mi app
import {
  CalendarEvent, // Cómo se ve cada evento
  Navbar, // La barra de navegación superior
  CalendarModal, // El modal para crear o editar eventos
  FabAddNew, // Botón flotante para agregar nuevo evento
  FabDelete, // Botón flotante para eliminar evento
} from "../";

// Importo el localizador y los textos en español
import { localizer, getMessagesES } from "../../helpers";

// Importo `useState` para manejar estado local
import { useState } from "react";

// Importo mis hooks personalizados para acceder al store
import { useUiStore, useCalendarStore } from "../../hooks";

// Componente principal que renderiza la página del calendario
export const CalendarPage = (props) => {
  // Obtengo la función para abrir el modal de fecha
  const { openDateModal } = useUiStore();

  // Obtengo los eventos almacenados en el store y la función para seleccionar uno
  const { events, setActiveEvent } = useCalendarStore();

  // Guardo el último tipo de vista que usó el usuario (semana, mes, día) en el estado
  const [lastView, setlastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  // Esta función define el estilo visual de los eventos en el calendario
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#347CF7", // Color azul de fondo
      borderRadius: "0px", // Bordes rectos
      opacity: 0.8, // Un poco transparente
      color: "white", // Texto blanco
    };
    return {
      style, // Devuelvo un objeto con la propiedad `style` que react-big-calendar va a aplicar
    };
  };

  // Esta función se ejecuta cuando hago doble clic sobre un evento
  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
    // Abro el modal para editar o ver detalles del evento
    openDateModal();
  };

  // Esta función se ejecuta cuando selecciono un evento (clic sencillo)
  const onSelect = (event) => {
    // Establezco el evento activo en el store
    setActiveEvent(event);
  };

  // Esta función se ejecuta cuando cambio la vista del calendario (semana, mes, etc.)
  const onViewchanged = (event) => {
    // Guardo la última vista en localStorage para que se recuerde al recargar
    localStorage.setItem("lastView", event);
    setlastView(event);
  };

  // Renderizo todo lo que compone la página del calendario
  return (
    <>
      {/* Barra de navegación */}
      <Navbar />

      {/* Componente principal del calendario */}
      <Calendar
        culture="es" // Establezco idioma
        messages={getMessagesES()} // Traduzco los textos del calendario
        localizer={localizer} // Le indico cómo manejar las fechas
        events={events} // Le paso los eventos que tengo guardados
        defaultView={lastView} // Vista predeterminada (semana, mes, día)
        startAccessor="start" // Le digo qué propiedad usar para el inicio
        endAccessor="end" // Le digo qué propiedad usar para el final
        style={{ height: "calc( 100vh - 80px )" }} // Le doy una altura que ocupe casi toda la pantalla
        eventPropGetter={eventStyleGetter} // Función que aplica estilos a cada evento
        components={{ event: CalendarEvent }} // Personalizo cómo se ve cada evento
        onDoubleClickEvent={onDoubleClick} // Qué pasa al hacer doble clic
        onSelectEvent={onSelect} // Qué pasa al hacer clic
        onView={onViewchanged} // Qué pasa al cambiar la vista
      />

      {/* Modal para crear o editar eventos */}
      <CalendarModal />

      {/* Botón flotante para eliminar eventos */}
      <FabDelete />

      {/* Botón flotante para agregar nuevos eventos */}
      <FabAddNew />
    </>
  );
};
