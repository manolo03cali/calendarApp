import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { PrivateLayout } from "../../src/layouts/PrivateLayout";
import { MemoryRouter } from "react-router-dom";
jest.mock("../../src/hooks/useAuthStore");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: () => <div>Contenido privado</div>,
  Navigate: ({ to }) => <span>Redirigiendo a {to}</span>,
}));

describe("Pruebas en <PrivateLayout />", () => {
  test("Debe redirigir al login si no esta autenticado", () => {
    useAuthStore.mockReturnValue({
      status: "not-authenticated",
    });
    render(
      <MemoryRouter>
        <PrivateLayout />
      </MemoryRouter>
    );
    expect(screen.getByText("Redirigiendo a /login")).toBeTruthy();
  });
  test("Debe mostrar el contenido privado si esta autenticado", () => {
    useAuthStore.mockReturnValue({
      status: "authenticated",
    });
    render(
      <MemoryRouter>
        <PrivateLayout />
      </MemoryRouter>
    );
    expect(screen.getByText("Contenido privado")).toBeTruthy();
  });
});
