export const events = [
  {
    id: "1",
    start: new Date("2022-10-31 10:00:00"),
    end: new Date("2022-10-31 13:00:00"),
    title: "Nota de prueba ",
    notes: "Este es el contenido de la nota de prueba",
  },
  {
    id: "2",
    start: new Date("2022-10-30 14:00:00"),
    end: new Date("2022-10-30 16:00:00"),
    title: "Asado en familia ",
    notes: "Contenido de la nota asado en familia",
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
};
export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
};
