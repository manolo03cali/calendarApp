// Importo utilidades de testing para trabajar con hooks y simular acciones
import { renderHook, act } from "@testing-library/react";

// Importo el hook personalizado y las funciones del store relacionadas con la UI
import {
  useUiStore,
  onOpenDateModal,
  onCloseDateModal,
} from "../../src/hooks/useUiStore";

// Importo el slice de Redux donde está definido el estado relacionado con la UI
import { uiSlice } from "../../src/store";

// Necesito usar `Provider` para envolver mis pruebas y que puedan acceder al store de Redux
import { Provider } from "react-redux";

// `configureStore` me permite crear un store de prueba con Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Esta función me permite crear un store simulado (mock) con un estado inicial específico
const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer, // Solo incluyo el reducer de `ui` porque es lo que estoy probando
    },
    preloadedState: {
      ui: { ...initialState }, // Establezco el estado inicial que necesito para cada prueba
    },
  });
};

// Comienzo la suite de pruebas del hook `useUiStore`
describe("Pruebas en hook useUiStore", () => {
  // Primera prueba: me aseguro de que el hook regresa el estado por defecto correctamente
  test("debe de regresar los valores por defecto", () => {
    // Creo un store con el modal cerrado
    const mockStore = getMockStore({
      isDateModalOpen: false,
    });

    // Creo un wrapper para que el hook tenga acceso al store mediante el Provider
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );

    // Renderizo el hook dentro del contexto del Provider
    const { result } = renderHook(() => useUiStore(), {
      wrapper,
    });

    // Verifico que el estado y las funciones que expone el hook sean las correctas
    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
      toggleDateModal: expect.any(Function),
    });
  });

  // Segunda prueba: verifico que la función `openDateModal` cambia el estado a `true`
  test("openDateModal debe de colocar en true el isDateModalOpen", () => {
    // Inicio con el modal cerrado
    const mockStore = getMockStore({
      isDateModalOpen: false,
    });

    // Creo el wrapper como en la prueba anterior
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );

    // Renderizo el hook
    const { result } = renderHook(() => useUiStore(), {
      wrapper,
    });

    // Simulo la acción de abrir el modal usando `act` (obligatorio para actualizar el estado en pruebas)
    act(() => {
      result.current.openDateModal();
    });

    // Verifico que el estado del modal ahora sea `true`
    expect(result.current.isDateModalOpen).toBeTruthy();
  });
  test("closeDateModal debe de colocar en false el isDateModalOpen", () => {
    // Inicio con el modal abierto
    const mockStore = getMockStore({
      isDateModalOpen: true,
    });

    // Creo el wrapper como en la prueba anterior
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );

    // Renderizo el hook
    const { result } = renderHook(() => useUiStore(), {
      wrapper,
    });

    // Simulo la acción de cerrar el modal usando `act` (obligatorio para actualizar el estado en pruebas)
    act(() => {
      result.current.closeDateModal();
    });
    // Verifico que el estado del modal ahora sea `false`
    expect(result.current.isDateModalOpen).toBeFalsy();
  });
  test("toggleDateModal debe de cambiar el estado del modal", () => {
    // Inicio con el modal abierto
    const mockStore = getMockStore({
      isDateModalOpen: true,
    });

    // Creo el wrapper como en la prueba anterior
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );

    // Renderizo el hook
    const { result } = renderHook(() => useUiStore(), {
      wrapper,
    });

    // Obtengo la función `toggleDateModal` y el estado actual del hook
    //const { isDateModalOpen, toggleDateModal } = result.current;

    // Simulo laacción de alternar el estado del modal usando `act` (obligatorio para actualizar el estado en pruebas)
    act(() => {
      result.current.toggleDateModal();
    });

    // Verifico que el estado del modal ahora sea `false`
    expect(result.current.isDateModalOpen).toBeFalsy();

    act(() => {
      result.current.toggleDateModal();
    });
    expect(result.current.isDateModalOpen).toBeTruthy();
  });
});
