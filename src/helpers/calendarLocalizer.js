// Importo `dateFnsLocalizer` de react-big-calendar para adaptar las funciones de fecha a la librería
import { dateFnsLocalizer } from "react-big-calendar";

// Importo las funciones necesarias desde date-fns para formatear y manipular fechas
import { format, parse, startOfWeek, getDay } from "date-fns";

// Importo el idioma español desde date-fns para que el calendario esté en español
import esES from "date-fns/locale/es";

// Creo un objeto locales donde asocio el idioma "es" con la configuración importada de `esES`
const locales = {
  es: esES,
};

// Creo el `localizer`, que es lo que react-big-calendar necesita para saber
// cómo formatear y manejar fechas en el idioma/localización deseada
export const localizer = dateFnsLocalizer({
  format, // Le indico cómo formatear las fechas (ej: 'dd/MM/yyyy')
  parse, // Le indico cómo interpretar cadenas de texto como fechas
  startOfWeek, // Le digo qué día comienza la semana (lunes o domingo)
  getDay, // Le paso la función que obtiene el número del día de la semana
  locales, // Le paso el objeto de idiomas (en este caso, sólo "es")
});
