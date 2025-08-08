// Importamos las herramientas necesarias para testear componentes de React
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

// Importamos el componente que vamos a testear
import { LoginPage } from "../../../src/auth/pages/LoginPage";

// Importamos los hooks personalizados que vamos a mockear
import { useAuthStore } from "../../../src/hooks/useAuthStore";
import { useForm } from "../../../src/hooks/useForm";

// Importamos SweetAlert2 para verificar si se disparan alertas
import Swal from "sweetalert2";

// Mockeamos el hook de autenticación
jest.mock("../../../src/hooks/useAuthStore");

// Mockeamos el hook de formularios
jest.mock("../../../src/hooks/useForm");

// Mockeamos SweetAlert2 con una función `fire` falsa para espiar su uso
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

// Comenzamos la suite de pruebas del componente <LoginPage />
describe("Pruebas en <LoginPage />", () => {
  // Creamos funciones simuladas para login y registro
  const mockStartLogin = jest.fn();
  const mockStartRegister = jest.fn();

  // Antes de cada prueba limpiamos mocks anteriores y redefinimos useAuthStore
  beforeEach(() => {
    jest.clearAllMocks();

    useAuthStore.mockReturnValue({
      startLogin: mockStartLogin,
      startRegister: mockStartRegister,
      errorMessage: null,
      status: "not-authenticated",
    });
  });

  test("debe mostrar el formulario de ingreso y registro", () => {
    // Mock básico de useForm para que el formulario se renderice sin errores
    useForm
      .mockReturnValueOnce({
        loginEmail: "",
        loginPassword: "",
        onInputChange: jest.fn(),
      })
      .mockReturnValueOnce({
        registerName: "",
        registerEmail: "",
        registerPassword: "",
        registerPassword2: "",
        onInputChange: jest.fn(),
      });

    // Renderizamos el componente
    render(<LoginPage />);

    // Verificamos que los títulos de ambos formularios existan
    expect(screen.getByText("Ingreso")).toBeTruthy();
    expect(screen.getByText("Registro")).toBeTruthy();
  });

  test("submit del login debe llamar startLogin con los datos del formulario", () => {
    // Mockeamos el formulario con datos de login
    useForm
      .mockReturnValueOnce({
        loginEmail: "test@correo.com",
        loginPassword: "123456",
        onInputChange: jest.fn(),
      })
      .mockReturnValueOnce({
        registerName: "",
        registerEmail: "",
        registerPassword: "",
        registerPassword2: "",
        onInputChange: jest.fn(),
      });

    // Renderizamos el componente
    render(<LoginPage />);

    // Obtenemos el formulario de login por su `role` y `name`
    const loginForm = screen.getByRole("form", { name: "loginForm" });

    // Simulamos el envío del formulario
    fireEvent.submit(loginForm);

    // Verificamos que se haya llamado `startLogin` con los valores esperados
    expect(mockStartLogin).toHaveBeenCalledWith({
      email: "test@correo.com",
      password: "123456",
    });
  });

  test("submit del registro exitoso debe llamar startRegister", () => {
    // Mockeamos los valores del formulario de registro
    useForm
      .mockReturnValueOnce({
        loginEmail: "",
        loginPassword: "",
        onInputChange: jest.fn(),
      })
      .mockReturnValueOnce({
        registerName: "New User",
        registerEmail: "new@correo.com",
        registerPassword: "password123",
        registerPassword2: "password123",
        onInputChange: jest.fn(),
      });

    // Renderizamos el componente
    render(<LoginPage />);

    // Seleccionamos el formulario de registro por su `role` y `name`
    const registerForm = screen.getByRole("form", { name: "registerForm" });

    // Simulamos el envío del formulario
    fireEvent.submit(registerForm);

    // Verificamos que se haya llamado `startRegister` con los valores correctos
    expect(mockStartRegister).toHaveBeenCalledWith({
      name: "New User",
      email: "new@correo.com",
      password: "password123",
    });
  });

  test("registro con contraseñas distintas debe disparar Swal.fire", () => {
    // Mockeamos valores para que las contraseñas no coincidan
    useForm
      .mockReturnValueOnce({
        loginEmail: "",
        loginPassword: "",
        onInputChange: jest.fn(),
      })
      .mockReturnValueOnce({
        registerName: "New User",
        registerEmail: "new@correo.com",
        registerPassword: "123456",
        registerPassword2: "654321", // Contraseña distinta
        onInputChange: jest.fn(),
      });

    // Renderizamos el componente
    render(<LoginPage />);

    // Seleccionamos el formulario de registro
    const registerForm = screen.getByRole("form", { name: "registerForm" });

    // Simulamos el envío del formulario
    fireEvent.submit(registerForm);

    // Verificamos que se haya disparado una alerta con el mensaje de error
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error en la autenticación",
      "Las contraseñas no son iguales",
      "error"
    );
  });

  test("debe mostrar Swal.fire si hay un errorMessage", async () => {
    // Simulamos que hubo un error de login o registro
    useAuthStore.mockReturnValue({
      startLogin: mockStartLogin,
      startRegister: mockStartRegister,
      errorMessage: "Credenciales incorrectas",
      status: "not-authenticated",
    });

    // Mock de formulario vacío
    useForm
      .mockReturnValueOnce({
        loginEmail: "",
        loginPassword: "",
        onInputChange: jest.fn(),
      })
      .mockReturnValueOnce({
        registerName: "",
        registerEmail: "",
        registerPassword: "",
        registerPassword2: "",
        onInputChange: jest.fn(),
      });

    // Renderizamos el componente
    render(<LoginPage />);

    // Esperamos que se dispare la alerta con el mensaje de error
    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        "Error en la autenticación",
        "Credenciales incorrectas",
        "error"
      );
    });
  });
});
