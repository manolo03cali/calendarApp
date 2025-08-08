import {
  authSlice,
  onLogout,
  onLogin,
  clearErrorMessage,
} from "../../../src/store/auth/authSlice";
import {
  initialState,
  authenticatedState,
  notAuthenticatedState,
} from "../../__fixtures/authStates";
import { testUserCredentials } from "../../__fixtures/testUser";

describe("Pruebas en authSlice", () => {
  test("Debe de retornar el estado por defecto", () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });
  test("Debe de realizar el login", () => {
    const state = authSlice.reducer(initialState, onLogin(testUserCredentials));
    expect(state).toEqual({
      status: "authenticated",
      user: testUserCredentials,
      errorMessage: null,
    });
  });
  test("Debe de realizar el logout", () => {
    const state = authSlice.reducer(authenticatedState, onLogout());
    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: null,
    });
  });
  test("Debe de realizar el logout", () => {
    const errorMessage = "Credenciales no son correctas";
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    expect(state).toEqual({
      status: "not-authenticated",
      user: {},
      errorMessage: errorMessage,
    });
  });
  test("Debe de limpiar el mensaje de error", () => {
    const errorMessage = "Credenciales no son correctas";
    const state = authSlice.reducer(authenticatedState, onLogout(errorMessage));
    const newState = authSlice.reducer(state, clearErrorMessage());
    expect(newState.errorMessage).toBe(null);
  });
});
