// Importo las herramientas necesarias para probar componentes de React:
// - `render`: Para renderizar el componente en un entorno virtual.
// - `screen`: Para buscar elementos en el DOM renderizado.
import { render, screen } from "@testing-library/react";

// Importo el componente que voy a probar, `CalendarEvent`, desde su ruta.
import { CalendarEvent } from "../../../src/calendar/components/CalendarEvent";

// Empiezo un bloque de pruebas con `describe` para agrupar pruebas relacionadas con `CalendarEvent`.
describe("Pruebas en CalendarEvent", () => {
  // Defino una prueba específica con `test` (o `it` también funciona).
  // Esta prueba verifica que el componente se renderice correctamente.
  test("Debe re renderizar correctamente", () => {
    // Creo un objeto `mockEvent` que simula los datos que recibe el componente.
    // Este objeto tiene:
    // - `title`: El título del evento ("Prueba").
    // - `user`: Un objeto con el nombre del usuario ("userPrueba").
    const mockEvent = {
      title: "Prueba",
      user: {
        name: "userPrueba",
      },
    };

    // Renderizo el componente `CalendarEvent` pasándole el `mockEvent` como prop.
    render(<CalendarEvent event={mockEvent} />);

    // Verifico que el título del evento ("Prueba") esté en el DOM.
    // Uso `screen.getByText` para buscar el texto exacto.
    // Si no lo encuentra, el test fallará.
    expect(screen.getByText("Prueba")).toBeInTheDocument();

    // Verifico que el nombre del usuario ("- userPrueba") esté en el DOM.
    // El componente agrega un guión (`-`) antes del nombre del usuario,
    // por eso busco el texto completo: `- userPrueba`.
    expect(screen.getByText("- userPrueba")).toBeInTheDocument();
  });
  test("Debe de renderizar el texto sin usuario", () => {
    // Creo un objeto `mockEvent2` que simula un evento sin usuario.
    const mockEvent2 = { title: "Evento sin usuario" };
    render(<CalendarEvent event={mockEvent2} />);
    expect(screen.getByText("Evento sin usuario")).toBeInTheDocument();
    expect(screen.queryByText("-")).toBeNull(); // Asegura que no hay guión
  });
});
