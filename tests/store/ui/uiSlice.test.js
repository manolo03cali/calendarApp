import {
  onCloseDateModal,
  onOpenDateModal,
  uiSlice,
} from "../../../src/store/ui/uiSlice";

describe("Pruebas en uiSlice", () => {
  test("Debe de retornar el estado por defecto", () => {
    // console.log(uiSlice.getInitialState());
    const state = uiSlice.getInitialState().isDateModalOpen;
    expect(state).toBeFalsy();
  });
  test("Debe de cambiar el isDateModalOpen correctamente ", () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();
    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
