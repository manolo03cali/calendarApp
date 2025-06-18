// Importo `memo` desde React para evitar renderizados innecesarios si las props no cambian
import { memo } from "react";

// Defino y exporto el componente `CalendarEvent`
// Uso `memo` para memorizar el componente y que solo se vuelva a renderizar si cambian las props
export const CalendarEvent = memo(({ event }) => {
  // Extraigo `title` y `user` del objeto `event` que recibo como prop
  const { title, user } = event;

  return (
    <>
      {/* Muestro el título del evento en negrita */}
      <strong>{title}</strong>

      {/* Muestro el nombre del usuario si está disponible (uso opcional chaining para evitar errores si no hay user) */}
      <span> - {user?.name}</span>
    </>
  );
});
