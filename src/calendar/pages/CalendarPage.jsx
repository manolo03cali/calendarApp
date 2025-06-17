import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { addHours } from "date-fns";
import { CalendarEvent, Navbar, CalendarModal } from "../";
import { localizer, getMessagesES } from "../../helpers";
import { useState } from "react";

const events = [
  {
    title: "Cumpleaños del jefe",
    notes: "Hay que comprar el pastel",
    start: new Date(2025, 9, 20, 10, 0, 0),
    end: addHours(new Date(2025, 9, 20, 12, 0, 0), 2),
    bgColor: "#fafafa",
    user: {
      _id: "123",
      name: "Manuel",
    },
    allDay: false,
  },
  {
    title: "Conference",
    notes: "Debes asistir a la conferencia",
    start: new Date(2025, 9, 21, 9, 0, 0),
    end: new Date(2025, 9, 21, 17, 0, 0),
    allDay: true,
  },
];

export const CalendarPage = (props) => {
  const [lastView, setlastView] = useState(
    localStorage.getItem("lastView") || "week"
  );
  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return {
      style,
    };
  };
  const onDoubleClick = (event) => {
    console.log({ doubleClick: event });
    setIsModalOpen(true);
  };
  const onSelect = (event) => {
    console.log({ click: event });
  };
  const onViewchanged = (event) => {
    localStorage.setItem("lastView", event);
    setlastView(event);
  };

  return (
    <>
      <Navbar />
      <Calendar
        culture="es"
        messages={getMessagesES()}
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc( 100vh - 80px )" }}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewchanged}
      />
      <CalendarModal />
    </>
  );
};
