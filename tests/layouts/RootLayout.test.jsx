// Importo MemoryRouter para simular el enrutamiento sin necesidad del navegador
import { MemoryRouter } from "react-router-dom";

// Importo el hook personalizado que voy a mockear
import { useAuthStore } from "../../src/hooks/useAuthStore";

// Importo el componente que voy a probar
import { RootLayout } from "../../src/layouts/RootLayout";

// Importo funciones de testing
import { render, screen } from "@testing-library/react";

// Hago un mock del hook useAuthStore para poder controlar su comportamiento en los tests
jest.mock("../../src/hooks/useAuthStore");

// También hago un mock del componente <Outlet /> de react-router-dom
// Esto me permite controlar lo que se renderiza cuando el usuario está autenticado o no
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: () => <div>Test children</div>, // lo reemplazo por un div con texto para verificar fácilmente que se renderiza
}));

describe("Pruebas en <RootLayout />", () => {
  // Creo un mock para la función checkAuthToken, que luego voy a verificar si se llamó
  const mockCheckAuthToken = jest.fn();

  // Antes de cada prueba, limpio todos los mocks para que no se acumulen llamadas anteriores
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Debe de mostrar la pantalla de carga y llamar a checkAuthToken", () => {
    // Simulo que el estado de autenticación está en 'checking'
    useAuthStore.mockReturnValue({
      status: "checking",
      checkAuthToken: mockCheckAuthToken,
    });

    // Renderizo el componente dentro de MemoryRouter (porque usa rutas internas)
    render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>
    );

    // Verifico que aparece el texto de "Cargando..."
    expect(screen.getByText("Cargando...")).toBeTruthy();

    // Verifico que se haya llamado la función checkAuthToken
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  test("Debe de mostrar el children si el status es authenticated", () => {
    // Simulo que el usuario ya está autenticado
    useAuthStore.mockReturnValue({
      status: "authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

    // Renderizo el componente
    render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>
    );

    // Como mockeé <Outlet /> para que muestre "Test children", verifico que ese texto se renderiza
    expect(screen.getByText("Test children")).toBeTruthy();
  });

  test("Debe de mostrar el children si el status es not-authenticated", () => {
    // Simulo que el usuario NO está autenticado
    useAuthStore.mockReturnValue({
      status: "not-authenticated",
      checkAuthToken: mockCheckAuthToken,
    });

    render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>
    );

    // Aun cuando no está autenticado, si el estado no es "checking", el componente debe renderizar <Outlet />
    expect(screen.getByText("Test children")).toBeTruthy();
  });
});
