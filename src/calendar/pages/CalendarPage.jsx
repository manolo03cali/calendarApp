// Primero importo el componente principal `Calendar` desde la librería react-big-calendar
import { Calendar } from "react-big-calendar";

// También importo los estilos por defecto que trae la librería para que el calendario se vea bien
import "react-big-calendar/lib/css/react-big-calendar.css";

// Luego traigo los componentes que he construido para mi aplicación:
import {
  CalendarEvent, // Este componente define cómo se verá cada evento dentro del calendario
  Navbar, // La barra superior de navegación con el nombre del usuario y botón para cerrar sesión
  CalendarModal, // Modal que uso para crear o editar eventos
  FabAddNew, // Botón flotante para agregar eventos
  FabDelete, // Botón flotante para eliminar el evento seleccionado
} from "../";

// Importo utilidades para la localización en español y para manejar fechas correctamente
import { localizer, getMessagesES } from "../../helpers";

// Uso `useState` para manejar estados locales y `useEffect` para cargar los eventos cuando se monte el componente
import { useEffect, useState } from "react";

// Traigo mis hooks personalizados que me conectan con el store
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";

// Defino el componente principal que renderiza toda la página del calendario
export const CalendarPage = () => {
  // Desde el store de autenticación, obtengo el usuario que ha iniciado sesión
  const { user } = useAuthStore();

  // Desde el store de la interfaz, obtengo la función que abre el modal para agregar o editar eventos
  const { openDateModal } = useUiStore();

  // Desde el store del calendario, obtengo:
  // - la lista de eventos
  // - la función para establecer el evento activo
  // - y la función para cargar los eventos desde el backend
  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  // Creo un estado local para guardar la última vista que usó el usuario en el calendario (semana, mes, día)
  const [lastView, setlastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  // Esta función decide cómo se verá cada evento visualmente (colores, opacidad, etc.)
  const eventStyleGetter = (event, start, end, isSelected) => {
    // Verifico si el evento es mío (comparando el usuario actual con el dueño del evento)
    const isMyEvent =
      user.uid === event.user._id || user.uid === event.user.uid;

    // Defino los estilos para el evento
    const style = {
      backgroundColor: isMyEvent ? "#347CF7" : "#a640afff", // Azul si es mío, púrpura si no
      borderRadius: "0px", // Bordes rectos
      opacity: 0.8, // Ligera transparencia
      color: "white", // Texto blanco
    };

    // Devuelvo el estilo en el formato que react-big-calendar espera
    return { style };
  };

  // Esta función se ejecuta cuando hago doble clic sobre un evento del calendario
  const onDoubleClick = (event) => {
    console.log({ doubleClick: event }); // Puedo ver en consola cuál evento hice doble clic
    openDateModal(); // Abro el modal para ver o editar el evento
  };

  // Esta función se ejecuta cuando selecciono un evento con un solo clic
  const onSelect = (event) => {
    setActiveEvent(event); // Lo guardo como evento activo en el store
  };

  // Esta función se ejecuta cuando el usuario cambia la vista del calendario (semana, mes, día)
  const onViewchanged = (event) => {
    localStorage.setItem("lastView", event); // Guardo la vista en localStorage
    setlastView(event); // Actualizo el estado local
  };

  // Este `useEffect` se ejecuta una sola vez al cargar la página
  // Sirve para cargar todos los eventos desde la base de datos
  useEffect(() => {
    startLoadingEvents();
  }, []);

  // Finalmente, retorno la estructura visual de la página
  return (
    <>
      {/* Muestro la barra de navegación superior */}
      <Navbar />

      {/* Renderizo el calendario con toda su configuración */}
      <Calendar
        culture="es" // Le indico que la cultura es español
        messages={getMessagesES()} // Paso los textos traducidos al español
        localizer={localizer} // Localizador para fechas, usando date-fns
        events={events} // Lista de eventos que quiero mostrar
        defaultView={lastView} // Vista inicial (semana, mes, etc.)
        startAccessor="start" // Campo para la fecha de inicio del evento
        endAccessor="end" // Campo para la fecha de fin del evento
        style={{ height: "calc( 100vh - 80px )" }} // Altura del calendario (100% - navbar)
        eventPropGetter={eventStyleGetter} // Estilos personalizados para cada evento
        components={{ event: CalendarEvent }} // Componente personalizado para renderizar eventos
        onDoubleClickEvent={onDoubleClick} // Evento al hacer doble clic
        onSelectEvent={onSelect} // Evento al hacer clic
        onView={onViewchanged} // Evento al cambiar la vista
      />

      {/* Modal para agregar o editar un evento */}
      <CalendarModal />

      {/* Botón flotante para eliminar el evento activo */}
      <FabDelete />

      {/* Botón flotante para agregar un nuevo evento */}
      <FabAddNew />
    </>
  );
};
