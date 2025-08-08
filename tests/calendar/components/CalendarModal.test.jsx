// Importaciones necesarias para las pruebas
import Swal from "sweetalert2";
import { useCalendarStore, useUiStore } from "../../../src/hooks";
import { fireEvent, render, screen } from "@testing-library/react";
import { CalendarModal } from "../../../src/calendar/components/CalendarModal";
import userEvent from "@testing-library/user-event";

// Mock de los stores para aislar las pruebas del componente
jest.mock("../../../src/hooks/useCalendarStore");
jest.mock("../../../src/hooks/useUiStore");

// Mock de SweetAlert2 para evitar mostrar alertas reales durante las pruebas
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

// Mock de react-datepicker para simplificar las pruebas de fechas
jest.mock("react-datepicker", () => {
  const originalModule = jest.requireActual("react-datepicker");
  return {
    ...originalModule,
    __esModule: true,
    default: jest.fn(({ selected, onChange }) => (
      <input
        type="text"
        value={selected?.toString()}
        onChange={(e) => onChange(new Date(e.target.value))}
        data-testid="datepicker"
      />
    )),
  };
});

describe("Pruebas en <CalendarModal/>", () => {
  // Mocks de las funciones que vamos a probar
  const mockCloseDateModal = jest.fn();
  const mockStartSavingEvent = jest.fn();

  // Configuración inicial antes de cada prueba
  beforeEach(() => {
    jest.clearAllMocks();
    // Configuro los valores por defecto para los stores mockeados
    useUiStore.mockReturnValue({
      isDateModalOpen: true, // Modal abierto por defecto
      closeDateModal: mockCloseDateModal,
    });
    useCalendarStore.mockReturnValue({
      activeEvent: null, // Sin evento activo inicialmente
      startSavingEvent: mockStartSavingEvent,
    });
  });

  // PRUEBA 1: Verificar el renderizado básico del modal
  test("Debe de mostrar el modal correctamente", () => {
    render(<CalendarModal />);

    // Verifico que todos los elementos principales estén presentes
    expect(screen.getByText("Nuevo evento")).toBeInTheDocument();
    expect(screen.getByText("Fecha y hora inicio")).toBeInTheDocument();
    expect(screen.getByText("Fecha y hora fin")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Título del evento")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Notas")).toBeInTheDocument();
    expect(screen.getByText("Guardar")).toBeInTheDocument();
  });

  // PRUEBA 2: Comprobar carga de datos cuando hay un evento activo
  test("Debe de cargar los datos del evento activo", () => {
    // Configuro un evento de prueba
    const mockEvent = {
      title: "Titulo de prueba",
      notes: "Nota de prueba",
      start: new Date("2023-01-01T10:00:00"),
      end: new Date("2023-01-01T12:00:00"),
    };

    // Actualizo el mock del store para devolver el evento activo
    useCalendarStore.mockReturnValue({
      activeEvent: mockEvent,
      startSavingEvent: mockStartSavingEvent,
    });

    render(<CalendarModal />);

    // Verifico que los valores del evento se muestren correctamente
    expect(screen.getByDisplayValue("Titulo de prueba")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Nota de prueba")).toBeInTheDocument();
  });

  // PRUEBA 3: Validación de campo título requerido
  test("Debe de mostrar error si el titulo esta vacio", async () => {
    const user = userEvent.setup();
    render(<CalendarModal />);

    // Obtengo el input del título y lo limpio
    const titleInput = screen.getByPlaceholderText("Título del evento");
    await user.clear(titleInput);

    // Simulo hacer click en el botón Guardar
    const saveButton = screen.getByText("Guardar");
    await user.click(saveButton);

    // Verificaciones:
    // 1. Que el input tenga la clase de error
    // 2. Que se muestre la alerta con el mensaje correcto
    expect(titleInput).toHaveClass("is-invalid");
    expect(Swal.fire).toHaveBeenCalledWith(
      "Título obligatorio",
      "Debe ingresar el título del evento",
      "error"
    );
  });

  // PRUEBA 4: Validación de fechas
  test("Debe de validar que la fecha final sea posterior a la fecha inicial", async () => {
    const user = userEvent.setup();
    render(<CalendarModal />);

    // Obtengo los inputs de fecha (usando el testid del mock)
    const datepickers = screen.getAllByTestId("datepicker");
    const startDateInput = datepickers[0];
    const endDateInput = datepickers[1];

    // Simulo fechas inválidas (fin antes de inicio)
    fireEvent.change(startDateInput, {
      target: { value: new Date("2023-01-01T12:00:00") },
    });
    fireEvent.change(endDateInput, {
      target: { value: new Date("2023-01-01T10:00:00") },
    });

    // Intento guardar
    const saveButton = screen.getByText("Guardar");
    await user.click(saveButton);

    // Verifico que se muestre el error correcto
    expect(Swal.fire).toHaveBeenCalledWith(
      "Fechas incorrectas",
      "Revisar las fechas ingresadas",
      "error"
    );
  });

  // PRUEBA 5: Guardado exitoso de evento
  test("Debe de llamar a startSavingEvent con los datos correctos", async () => {
    const user = userEvent.setup();
    render(<CalendarModal />);

    // Obtengo los inputs y simulo la entrada de datos
    const titleInput = screen.getByPlaceholderText("Título del evento");
    const notesInput = screen.getByPlaceholderText("Notas");

    await user.type(titleInput, "Nuevo título");
    await user.type(notesInput, "Nuevas notas");

    // Simulo el envío del formulario
    const saveButton = screen.getByText("Guardar");
    await user.click(saveButton);

    // Verificaciones:
    // 1. Que se llamó a la función de guardado
    // 2. Que se cerró el modal
    expect(mockStartSavingEvent).toHaveBeenCalled();
    expect(mockCloseDateModal).toHaveBeenCalled();
  });

  // PRUEBA 6: Cierre del modal
  test("Debe de cerrar el modal al hacer click en el botón de cerrar", () => {
    render(<CalendarModal />);

    // Simulo el click en el overlay (react-modal usa esto para cerrar)
    const overlay = document.querySelector(".modal-fondo");
    fireEvent.click(overlay);

    // Verifico que se llamó a la función de cierre
    expect(mockCloseDateModal).toHaveBeenCalled();
  });
});
