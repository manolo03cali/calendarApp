// Primero importo las funciones necesarias de @testing-library/react para renderizar componentes
// y poder consultar el contenido del DOM dentro de mis pruebas.
import { render, screen } from "@testing-library/react";

// Luego importo herramientas de react-router-dom que me permiten simular rutas en un entorno de pruebas.
// `createMemoryRouter` me sirve para crear un router en memoria y `RouterProvider` para inyectarlo en el renderizado.
import { createMemoryRouter, RouterProvider } from "react-router-dom";

// Importo mi hook personalizado, `useAuthStore`, que normalmente se encarga de decirme si el usuario está autenticado.
import { useAuthStore } from "../../src/hooks/useAuthStore";

// Importo las rutas privadas que definí para la app, las mismas que usan el layout protegido y el calendario.
import { privateRoutes } from "../../src/routes/privateRoutes";

// Hago un mock de mi hook de autenticación para poder controlar el estado de autenticación dentro de los tests.
jest.mock("../../src/hooks/useAuthStore");

// También hago mocks de los componentes de página que uso en las rutas privadas,
// reemplazándolos por versiones simples con texto visible para facilitar las pruebas.
jest.mock("../../src/calendar/pages/CalendarPage", () => ({
  CalendarPage: () => <h1>MockCalendarPage</h1>,
}));
jest.mock("../../src/auth/pages/ErrorPage", () => ({
  ErrorPage: () => <h1>MockErrorPage</h1>,
}));

// Agrupo todos los tests relacionados con rutas privadas en un bloque `describe`.
describe("Pruebas en las rutas privadas", () => {
  // Antes de cada test, me aseguro de limpiar cualquier mock anterior
  // para que no interfiera con el siguiente test.
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Este primer test verifica que, si el usuario está autenticado, se debe mostrar el `CalendarPage`.
  test("Debe mostrar CalendarPage si el usuario está autenticado", () => {
    // Simulo que el hook de autenticación retorna que el usuario está "authenticated"
    useAuthStore.mockReturnValue({
      status: "authenticated",
    });

    // Creo un router en memoria con las rutas privadas, y le paso como ruta inicial la raíz "/"
    const router = createMemoryRouter(privateRoutes, {
      initialEntries: ["/"], // es como si el usuario entrara a "/"
    });

    // Renderizo el `RouterProvider` con ese router simulado
    const { container } = render(<RouterProvider router={router} />);

    // Verifico que se haya renderizado el texto que puse en el mock del CalendarPage.
    // Si aparece, significa que se cargó correctamente el componente.
    expect(screen.getByText("MockCalendarPage")).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  // Este segundo test verifica que incluso si el usuario entra a una ruta no definida,
  // se debe seguir mostrando el CalendarPage (según mi lógica de SPA centrada en el calendario).
  test("Debe de mostrar CalendarPage en cualquier ruta si está autenticado", () => {
    // Nuevamente simulo que el usuario está autenticado
    useAuthStore.mockReturnValue({
      status: "authenticated",
    });

    // En este caso, simulo que el usuario entra a una ruta no existente como "/cualquier-ruta"
    const router = createMemoryRouter(privateRoutes, {
      initialEntries: ["/cualquier-ruta"],
    });

    // Renderizo el RouterProvider como antes
    render(<RouterProvider router={router} />);

    // Verifico que, a pesar de ser una ruta no definida,
    // el componente `CalendarPage` se sigue mostrando correctamente.
    expect(screen.getByText("MockCalendarPage")).toBeInTheDocument();
  });
});
