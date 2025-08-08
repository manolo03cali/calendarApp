import { render } from "@testing-library/react";
import { ErrorPage } from "../../../src/auth";

describe("Pruebas de ErrorPage", () => {
  test("Debe de mostrar el mensaje por defecto", () => {
    const { getByText } = render(<ErrorPage />);
    expect(getByText("Página no encontrada")).toBeInTheDocument();
  });
});
