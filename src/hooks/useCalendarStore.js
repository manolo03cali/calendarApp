// Importo los hooks de Redux para poder interactuar con el store
import { useDispatch, useSelector } from "react-redux";

// Importo las acciones que puedo disparar sobre el slice del calendario
import {
  onSetActiveEvent, // Establece un evento como el activo
  onAddNewEvent, // Agrega un nuevo evento al store
  onUpdateEvent, // Actualiza un evento existente
  onDeleteEvent, // Elimina el evento activo
} from "../store";

// Creo un hook personalizado que encapsula toda la lógica relacionada con el calendario
export const useCalendarStore = () => {
  // Obtengo la función dispatch de Redux para poder lanzar acciones
  const dispatch = useDispatch();

  // Uso useSelector para extraer del estado global los datos del slice "calendar":
  // - events: todos los eventos guardados
  // - activeEvent: el evento actualmente seleccionado
  const { events, activeEvent } = useSelector((state) => state.calendar);

  // Esta función se encarga de marcar un evento como "activo" (por ejemplo, cuando hago clic sobre él)
  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  // Esta función decide si debo guardar un nuevo evento o actualizar uno existente
  const startSavingEvent = async (calendarEvent) => {
    if (calendarEvent._id) {
      // Si el evento ya tiene un _id, entonces es uno existente → lo actualizo
      dispatch(onUpdateEvent({ ...calendarEvent }));
    } else {
      // Si no tiene _id, es un evento nuevo → le genero uno y lo agrego
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  // Esta función borra el evento actualmente activo
  const startDeletingEvent = () => {
    // (En el futuro debería también eliminarlo del backend si se usa API)
    dispatch(onDeleteEvent());
  };

  // Devuelvo todas las propiedades y métodos que necesito exponer desde este hook
  return {
    // Propiedades del estado
    events,
    activeEvent,
    hasEventSelected: !!activeEvent, // Devuelvo true si hay un evento activo, false si no

    // Métodos para manejar eventos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  };
};
