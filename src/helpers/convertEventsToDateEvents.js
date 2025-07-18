// Importo la función `parseISO` desde la librería `date-fns`
// Esta función me permite convertir una cadena de fecha en formato ISO (string) a un objeto de tipo `Date`
import { parseISO } from "date-fns";

// Defino una función llamada `convertEventsToDateEvents` que recibe un arreglo de eventos
// Si no se le pasa nada, por defecto usará un arreglo vacío
export const convertEventsToDateEvents = (events = []) => {
  // Uso el método `.map()` para recorrer todos los eventos
  // Por cada evento, convierto las propiedades `start` y `end` de string a tipo `Date`
  return events.map((event) => {
    event.end = parseISO(event.end); // Convierto el campo `end` en un objeto Date
    event.start = parseISO(event.start); // Hago lo mismo con el campo `start`

    return event; // Devuelvo el evento modificado
  });
};
