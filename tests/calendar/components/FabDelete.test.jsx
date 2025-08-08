import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks/useCalendarStore";
import { useUiStore } from "../../../src/hooks/useUiStore";
jest.mock("../../../src/hooks/useCalendarStore");
jest.mock("../../../src/hooks/useUiStore");

describe("Pruebas en <FabDelete />", () => {
  const mockStartDeletingEvent = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks(), jest.clearAllTimers();
  });
  test("Debe de mostrar el componente correctamente", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    });
    useUiStore.mockReturnValue({
      isDateModalOpen: false,
      openDateModal: jest.fn(),
      closeDateModal: jest.fn(),
      // ... otras propiedades/métodos que use tu componente
    });
    render(<FabDelete />);
    //screen.debug();
    const btn = screen.getByLabelText("btn-delete");
    expect(btn.classList).toContain("btn");
    expect(btn.classList).toContain("btn-danger");
    expect(btn.classList).toContain("fab-danger");
    expect(btn.style.display).toBe("none");
  });
  test("Debe de mostrar el boton si hay un evento activo", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
    });
    useUiStore.mockReturnValue({
      isDateModalOpen: false,
      openDateModal: jest.fn(),
      closeDateModal: jest.fn(),
    });
    render(<FabDelete />);
    screen.debug();
    const btn = screen.getByLabelText("btn-delete");
    expect(btn.style.display).toBe("");
  });
  test("Debe de llamar startDeletingEvent al hacer click", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      startDeletingEvent: mockStartDeletingEvent,
    });

    render(<FabDelete />);
    const btn = screen.getByLabelText("btn-delete");
    fireEvent.click(btn);
    expect(mockStartDeletingEvent).toHaveBeenCalled();
  });
});
