// Primero importo `memo` desde React.
// Lo voy a usar para evitar que este componente se renderice otra vez si sus props no han cambiado.
import { memo } from "react";

// Ahora creo y exporto el componente `CalendarEvent`.
// Lo encierro en `memo` para que React lo "memorice", es decir, lo recuerde y no lo vuelva a renderizar innecesariamente.
export const CalendarEvent = memo(({ event }) => {
  // Desestructuro el objeto `event` que recibo como prop.
  // Extraigo `title` (el título del evento) y `user` (el usuario que lo creó o al que pertenece).
  const { title, user } = event;

  // Devuelvo el contenido que se va a renderizar en el calendario.
  return (
    <>
      {/* Muestro el título del evento en negrita usando <strong> */}
      <strong>{title}</strong>

      {/* Después muestro el nombre del usuario si existe.
          Uso el operador ?. (optional chaining) para evitar errores si `user` es undefined o null. */}
      {user?.name && <span> - {user?.name}</span>}
    </>
  );
});
