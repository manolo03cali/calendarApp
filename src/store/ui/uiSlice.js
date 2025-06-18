// Primero importo la función `createSlice` desde Redux Toolkit,
// esta función me permite crear de forma sencilla un slice del estado global
import { createSlice } from "@reduxjs/toolkit";

// Ahora creo el slice llamado `uiSlice`, que representará una parte
//  del estado relacionada con la interfaz de usuario (UI)
export const uiSlice = createSlice({
  // Le doy un nombre al slice, en este caso 'ui'
  name: "ui",

  // Defino el estado inicial de este slice
  initialState: {
    // Aquí empiezo con una propiedad llamada `idDateModalOpen`,
    // que me indica si el modal de fechas está abierto o no
    // Por defecto, el modal está cerrado
    isDateModalOpen: false,
  },

  // Defino los reducers, que son funciones que modifican el estado
  reducers: {
    // Esta función se llama cuando quiero abrir el modal
    // Cambio `idDateModalOpen` a true
    onOpenDateModal: (state) => {
      state.isDateModalOpen = true;
    },

    // Esta función se llama cuando quiero cerrar el modal
    // Cambio `isDateModalOpen` a false
    onCloseDateModal: (state) => {
      state.isDateModalOpen = false;
    },
  },
});

// Aquí exporto las acciones generadas automáticamente por createSlice
// Esto me permite usar `onOpenDateModal()` y `onCloseDateModal()` directamente en mis componentes
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
