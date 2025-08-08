import {
  calendarSlice,
  onAddNewEvent,
  onSetActiveEvent,
  onUpdateEvent,
  onDeleteEvent,
  onLoadEvents,
  onLogoutCalendar,
} from "../../../src/store/calendar/calendarSlice";
import {
  initialState,
  events,
  calendarWithActiveEventState,
  calendarWithEventsState,
} from "../../__fixtures/calendarstates";

describe("Pruebas en calendarSlice", () => {
  test("Debe de retornar el estado por defecto", () => {
    const state = calendarSlice.getInitialState();

    expect(state).toEqual(initialState);
  });
  test("onSetActiveEvent debe de activar el evento", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onSetActiveEvent(events[0])
    );
    expect(state.activeEvent).toEqual(events[0]);
  });
  test("onAddNewEvent debe de agregar un nuevo evento", () => {
    const newEvent = {
      id: "3",
      start: new Date("2022-10-31 10:00:00"),
      end: new Date("2022-10-31 13:00:00"),
      title: "Nota Nueva ",
      notes: "Este es el contenido de la nota nueva",
    };
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onAddNewEvent(newEvent)
    );
    expect(state.events).toEqual([...events, newEvent]);
    expect(state.events.length).toBe(3);
    expect(state.events[2]).toBe(newEvent);
  });
  test("onUpdateEvent", () => {
    const updatedEvent = {
      id: "1",
      start: new Date("2022-10-31 10:00:00"),
      end: new Date("2022-10-31 13:00:00"),
      title: "Nota Actualizada ",
      notes: "Este es el contenido de la nota actualizada",
    };
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onUpdateEvent(updatedEvent)
    );
    expect(state.events[0]).toBe(updatedEvent);
    expect(state.events).toContain(updatedEvent);
  });
  test("onDeleteEvent debe de borrar el evento activo", () => {
    const state = calendarSlice.reducer(
      calendarWithActiveEventState,
      onDeleteEvent()
    );
    expect(state.activeEvent).toBe(null);
    expect(state.events).not.toContain(events[0]);
  });
  test("onLoadEvents debe de establecer los eventos", () => {
    const state = calendarSlice.reducer(initialState, onLoadEvents(events));

    expect(state.isLoadingEvents).toBe(false);
    expect(state.activeEvent).toBeFalsy();
    expect(state.events).toEqual(events);
    const newState = calendarSlice.reducer(state, onLoadEvents(events));
    expect(state.events.length).toBe(events.length);
  });
  test("onLogoutCalendar debe de limpiar los eventos", () => {
    const state = calendarSlice.reducer(
      calendarWithEventsState,
      onLogoutCalendar()
    );
    expect(state).toEqual(initialState);
  });
});
