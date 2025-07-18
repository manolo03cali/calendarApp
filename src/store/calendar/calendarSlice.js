// Importo `createSlice` de Redux Toolkit para definir el estado y los reducers de mi calendario
import { createSlice } from "@reduxjs/toolkit";
// Importo `addHours` de date-fns para sumarle horas a la fecha actual
//import { addHours } from "date-fns";

// Creo un evento de ejemplo para probar el calendario. Esta será la base del estado inicial
// const templateEvent = {
//   id: new Date().getTime(), // Le doy un ID único usando la hora actual
//   title: "Cumpleaños del jefe", // Título del evento
//   notes: "Hay que comprar el pastel", // Notas adicionales
//   start: new Date(), // Fecha/hora de inicio (ahora mismo)
//   end: addHours(new Date(), 2), // Fecha/hora de fin (2 horas después del inicio)
//   bgColor: "#fafafa", // Color de fondo personalizado (no se usa aún)
//   user: {
//     id: "123", // ID del usuario que creó el evento
//     name: "Manuel", // Nombre del usuario
//   },
//   allDay: false, // Especifico que no es un evento de todo el día
// };

// Creo el slice del calendario usando Redux Toolkit
export const calendarSlice = createSlice({
  name: "calendar", // Nombre del slice

  // Estado inicial del calendario: un evento por defecto y ningún evento activo seleccionado
  initialState: {
    events: [
      //templateEvent
    ], // Lista de eventos (empiezo con uno de prueba)
    activeEvent: null, // Evento actualmente seleccionado (por defecto, ninguno)
    isLoadingEvents: true,
  },

  // Defino los reducers (funciones que modifican el estado)
  reducers: {
    // Selecciono un evento como "activo"
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },

    // Agrego un nuevo evento al calendario
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload); // Lo agrego a la lista
      state.activeEvent = null; // Limpio el evento activo
    },

    // Actualizo un evento existente (busco por ID)
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        // Si el ID coincide, lo reemplazo por el nuevo evento (payload)
        if (event.id === payload.id) {
          return payload;
        }
        // Si no coincide, lo dejo igual
        return event;
      });
    },

    // Elimino el evento actualmente activo (si existe)
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        // Filtro los eventos y elimino el que coincide con el ID del evento activo
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id
        );
        // Limpio el evento activo
        state.activeEvent = null;
      }
    },
    onLoadEvents: (state, { payload = [] }) => {
      //state.events = payload;
      state.isLoadingEvents = false;
      payload.forEach((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});

// Exporto las acciones que puedo usar desde mis componentes para disparar los reducers
export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
} = calendarSlice.actions;
