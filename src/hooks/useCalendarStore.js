// Importo los hooks de Redux para poder interactuar con el store
import { useDispatch, useSelector } from "react-redux";

// Importo las acciones que puedo disparar sobre el slice del calendario
import {
  onSetActiveEvent, // Establece un evento como el activo (seleccionado)
  onAddNewEvent, // Agrega un nuevo evento al store
  onUpdateEvent, // Actualiza un evento existente en el store
  onDeleteEvent, // Elimina el evento activo del store
  onLoadEvents, // Carga los eventos desde la base de datos
} from "../store";

// Importo la API personalizada para hacer peticiones HTTP
import { calendarApi } from "../api";

// Función auxiliar que convierte las fechas de los eventos a objetos Date reales
import { convertEventsToDateEvents } from "../helpers";

// Librería externa para mostrar alertas visuales
import Swal from "sweetalert2";

// Creo un hook personalizado que encapsula toda la lógica relacionada con el calendario
export const useCalendarStore = () => {
  // Obtengo `dispatch` para poder lanzar acciones a Redux
  const dispatch = useDispatch();

  // Extraigo datos del estado global: los eventos, el evento activo y si ya cargué los eventos
  const { events, activeEvent, isLoaded } = useSelector(
    (state) => state.calendar
  );

  // También necesito acceder al usuario autenticado para asociarlo a los eventos
  const { user } = useSelector((state) => state.auth);

  // === Función: seleccionar un evento activo ===
  // Se llama cuando el usuario hace clic en un evento del calendario
  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  // === Función: guardar un evento (nuevo o existente) ===
  const startSavingEvent = async (calendarEvent) => {
    try {
      // Si el evento ya tiene un id, significa que ya existe → actualizo
      if (calendarEvent.id) {
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdateEvent({ ...calendarEvent, user })); // actualizo con usuario
        return;
      }

      // Si no tiene id, entonces es un evento nuevo → lo creo
      const { data } = await calendarApi.post("/events", calendarEvent);
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user })); // le asigno el id del backend
    } catch (error) {
      console.log(error);
      // Si algo falla, muestro una alerta con el mensaje de error del backend
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  // === Función: eliminar el evento actualmente activo ===
  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`); // envío petición DELETE
      dispatch(onDeleteEvent()); // y luego actualizo el store
    } catch (error) {
      console.log(error);
      Swal.fire("Error al eliminar", error.response.data.msg, "error");
    }
  };

  // === Función: cargar los eventos desde el backend ===
  const startLoadingEvents = async () => {
    if (isLoaded) return; // Evito recargar si ya fueron cargados

    console.log("ejecutando startLoadingEvents()");
    try {
      const { data } = await calendarApi.get("/events"); // obtengo los eventos
      const events = convertEventsToDateEvents(data.events); // convierto strings a fechas reales
      dispatch(onLoadEvents(events)); // actualizo el estado con los eventos cargados
    } catch (error) {
      console.log("Error cargando eventos");
      console.log(error);
    }
  };

  // === Retorno de valores y funciones ===
  return {
    // Propiedades del estado del calendario
    events, // Lista de todos los eventos
    activeEvent, // Evento actualmente seleccionado
    hasEventSelected: !!activeEvent, // true si hay evento seleccionado

    // Métodos disponibles para los componentes
    setActiveEvent, // Seleccionar evento
    startSavingEvent, // Guardar o actualizar evento
    startDeletingEvent, // Eliminar evento
    startLoadingEvents, // Cargar eventos
  };
};
