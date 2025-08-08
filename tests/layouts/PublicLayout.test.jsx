import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { PublicLayout } from "../../src/layouts/PublicLayout";
import { MemoryRouter } from "react-router-dom";
jest.mock("../../src/hooks/useAuthStore");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: () => <div>Contenido publico</div>,
  Navigate: ({ to }) => <span>Redirigiendo a {to}</span>,
}));

describe("Pruebas en <PublicLayout />", () => {
  test("Debe redirigir a / si esta autenticado", () => {
    useAuthStore.mockReturnValue({
      status: "authenticated",
    });
    render(
      <MemoryRouter>
        <PublicLayout />
      </MemoryRouter>
    );
    expect(screen.getByText("Redirigiendo a /")).toBeTruthy();
  });
  test("Debe mostrar el contenido publico si no esta autenticado", () => {
    useAuthStore.mockReturnValue({
      status: "not-authenticated",
    });
    render(
      <MemoryRouter>
        <PublicLayout />
      </MemoryRouter>
    );
    expect(screen.getByText("Contenido publico")).toBeTruthy();
  });
});
