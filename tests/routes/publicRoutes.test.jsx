// Estoy escribiendo pruebas para las rutas públicas de mi aplicación, usando React Testing Library y React Router.
// Importo funciones básicas para renderizar componentes y consultar elementos del DOM.
import { render, screen } from "@testing-library/react";

// Importo funciones de React Router que me permiten simular navegación en pruebas.
import { createMemoryRouter, RouterProvider } from "react-router-dom";

// Importo el arreglo de rutas públicas que definí en mi aplicación.
import { publicRoutes } from "../../src/routes/publicRoutes";

// Importo mi hook personalizado de autenticación.
// Lo voy a simular (mockear) para poder controlar su comportamiento dentro de las pruebas.
import { useAuthStore } from "../../src/hooks/useAuthStore";
jest.mock("../../src/hooks/useAuthStore");

// Como en estas pruebas solo quiero verificar si las rutas cargan correctamente,
// hago un mock simple del componente LoginPage para que se renderice como un texto plano.
jest.mock("../../src/auth/pages/LoginPage", () => ({
  LoginPage: () => <h1>MockLoginPage</h1>,
}));

// También simulo el ErrorPage (si está incluido en las rutas públicas) para facilitar las validaciones.
jest.mock("../../src/auth/pages/ErrorPage", () => ({
  ErrorPage: () => <h1>Página no encontrada</h1>,
}));

// Agrupo todas las pruebas relacionadas con rutas públicas en un bloque `describe`.
describe("Pruebas en las rutas públicas", () => {
  // Antes de cada prueba, limpio todos los mocks para evitar interferencias entre tests.
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Primera prueba: Quiero comprobar que, si no estoy autenticado y entro a "/login", se muestre la página de login.
  test("Debe mostrar <LoginPage /> cuando navego a /login y no estoy autenticado", () => {
    // Simulo que el estado de autenticación es "no autenticado"
    useAuthStore.mockReturnValue({
      status: "not-authenticated",
      errorMessage: null,
    });

    // Creo un router de prueba que simule navegación a la ruta "/login"
    const router = createMemoryRouter(publicRoutes, {
      initialEntries: ["/login"], // es como si el usuario escribiera esta URL
    });

    // Renderizo el router dentro del test
    render(<RouterProvider router={router} />);

    // Verifico que se haya renderizado el componente de LoginPage (mockeado)
    expect(screen.getByText("MockLoginPage")).toBeInTheDocument();
  });

  // Segunda prueba: Si intento entrar a una ruta no existente, y no estoy autenticado, debe mostrar la página de error.
  test("Debe mostrar <ErrorPage /> cuando navego a una ruta no válida estando no autenticado", () => {
    // Simulo nuevamente que el usuario no está autenticado
    useAuthStore.mockReturnValue({
      status: "not-authenticated",
    });

    // Simulo navegación a una ruta inexistente
    const router = createMemoryRouter(publicRoutes, {
      initialEntries: ["/ruta-no-existe"],
    });

    // Renderizo el router con esa ruta inválida
    render(<RouterProvider router={router} />);

    // Verifico que se muestre el componente ErrorPage (mockeado)
    expect(screen.getByText("Página no encontrada")).toBeInTheDocument();
  });
});
