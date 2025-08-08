import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store";
import { Provider } from "react-redux";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import {
  initialState,
  authenticatedState,
  notAuthenticatedState,
} from "../__fixtures/authStates";
import { testUserCredentials, testUserNew } from "../__fixtures/testUser";
import { calendarApi } from "../../src/api";

getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer, // Solo incluyo el reducer de `auth` porque es lo que estoy probando
    },
    preloadedState: {
      auth: { ...initialState }, // Establezco el estado inicial que necesito para cada prueba
    },
  });
};
describe("Pruebas en useAuthStore", () => {
  beforeEach(() => {
    localStorage.clear();
  });
  test("debe de regresar los valores por defecto", () => {
    const mockStore = getMockStore({
      ...initialState,
    });
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );

    // Renderizo el hook
    const { result } = renderHook(() => useAuthStore(), {
      wrapper,
    });
    // console.log(result);
    // Verifico que el estado y las funciones que expone el hook sean las correctas
    expect(result.current).toEqual({
      status: "checking",
      user: {},
      errorMessage: null,
      startLogin: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
      startLogout: expect.any(Function),
    });
  });
  test("startLogin debe de realizar login correctamente", async () => {
    //ojo para esta prueba tenemos el backend corriendo
    const mockStore = getMockStore({
      ...notAuthenticatedState,
    });
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );
    // Renderizo el hook
    const { result } = renderHook(() => useAuthStore(), {
      wrapper,
    });

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    // console.log(result.current);
    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: null,
      status: "authenticated",
      user: {
        name: "testUser",
        uid: "6888fe2fe400bc87169f1c16",
      },
    });
    expect(localStorage.getItem("token")).toEqual(expect.any(String));
  });
  test("startLogin debe de fallar la autenticación", async () => {
    const mockStore = getMockStore({
      ...notAuthenticatedState,
    });
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );
    // Renderizo el hook
    const { result } = renderHook(() => useAuthStore(), {
      wrapper,
    });

    await act(async () => {
      await result.current.startLogin({
        email: "iron@man.com",
        password: "ironman",
      });
    });
    //console.log(result.current);
    // console.log(localStorage.getItem("token"));
    const { errorMessage, status, user } = result.current;
    expect(localStorage.getItem("token")).toBe(null);

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: expect.any(String),
      status: "not-authenticated",
      user: {},
    });
    await waitFor(() => {
      expect(result.current.errorMessage).toBe(null);
    });
  });
  test("startReguster debe de crear un nuevo usuario", async () => {
    const mockStore = getMockStore({
      ...notAuthenticatedState,
    });
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );
    // Renderizo el hook
    const { result } = renderHook(() => useAuthStore(), {
      wrapper,
    });

    const spy = jest.spyOn(calendarApi, "post").mockReturnValue({
      data: {
        ok: true,
        uid: "6558fd07cualquiercosa",
        name: "testUserNew",
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2ODg4ZmQwN2U0MDBiYzg3MTY5ZjFjMGQiLCJuYW1lIjoidGVzdFVzZXIyIiwiaWF0IjoxNzUzODA4MTM1LCJleHAiOjE3NTM4MTUzMzV9.aA7VAqGbMV7e0CmUSPmRPlsjjG41c0AVXKDfdbSeBCQ",
      },
    });
    await act(async () => {
      await result.current.startRegister(testUserNew);
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: null,
      status: "authenticated",
      user: {
        name: "testUserNew",
        uid: "6558fd07cualquiercosa",
      },
    });
    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    spy.mockRestore();
  });
  test("startRegister debe fallar la creación del usuario", async () => {
    const mockStore = getMockStore({
      ...notAuthenticatedState,
    });
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );
    // Renderizo el hook
    const { result } = renderHook(() => useAuthStore(), {
      wrapper,
    });

    await act(async () => {
      await result.current.startRegister(testUserCredentials);
    });
    //console.log(result.current);
    const { errorMessage, status, user } = result.current;
    expect(localStorage.getItem("token")).toBe(null);
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: expect.any(String),
      status: "not-authenticated",
      user: {},
    });
  });
  test("checkAuthToken debe de fallar la autenticación", async () => {
    const mockStore = getMockStore({
      ...initialState,
    });
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );
    // Renderizo el hook
    const { result } = renderHook(() => useAuthStore(), {
      wrapper,
    });
    await act(async () => {
      await result.current.checkAuthToken();
    });
    // console.log("token", localStorage.getItem("token"));
    const { errorMessage, status, user } = result.current;
    expect(localStorage.getItem("token")).toBe(null);
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: null,
      status: "not-authenticated",
      user: {},
    });
  });
  test("checkAuthToken debe de realizar la autenticación si hay un token", async () => {
    const { data } = await calendarApi.post("/auth", testUserCredentials);
    localStorage.setItem("token", data.token);
    const mockStore = getMockStore({
      ...initialState,
    });
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );
    // Renderizo el hook
    const { result } = renderHook(() => useAuthStore(), {
      wrapper,
    });
    await act(async () => {
      await result.current.checkAuthToken();
    });
    // console.log("token", localStorage.getItem("token"));
    const { errorMessage, status, user } = result.current;
    // console.log(result.current);
    expect(localStorage.getItem("token")).toBe(data.token);
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: null,
      status: "authenticated",
      user: { name: "testUser", uid: "6888fe2fe400bc87169f1c16" },
    });
  });
  test("startLogout debe de borrar el token", async () => {
    localStorage.setItem("token", "test-token");
    const mockStore = getMockStore({
      ...authenticatedState,
    });
    const wrapper = ({ children }) => (
      <Provider store={mockStore}>{children}</Provider>
    );
    // Renderizo el hook
    const { result } = renderHook(() => useAuthStore(), {
      wrapper,
    });
    // 3. Verificar estado inicial (opcional)
    expect(localStorage.getItem("token")).toBe("test-token");
    expect(result.current.status).toBe("authenticated");
    await act(async () => {
      await result.current.startLogout();
    });
    const { errorMessage, status, user } = result.current;
    console.log(result.current);
    expect(localStorage.getItem("token")).toBe(null);
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: null,
      status: "not-authenticated",
      user: {},
    });
  });
});
