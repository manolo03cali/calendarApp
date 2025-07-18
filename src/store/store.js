// Importo `configureStore` desde Redux Toolkit, que me permite crear fácilmente el store de Redux
import { configureStore } from "@reduxjs/toolkit";

// Importo los slices que he creado para manejar diferentes partes del estado (UI y Calendario)
import { uiSlice, calendarSlice, authSlice } from "./";

// Creo y exporto el store de Redux, que va a contener todo el estado global de mi aplicación
export const store = configureStore({
  // Aquí defino los "reducers" que componen el estado global
  // Asigno el slice `ui` y el slice `calendar` con sus respectivos reducers
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer, // El estado relacionado con el UI (modal abierto/cerrado, etc.)
    calendar: calendarSlice.reducer, // El estado del calendario (eventos, evento activo, etc.)
  },

  // Configuro los middlewares predeterminados de Redux Toolkit
  // Desactivo el chequeo de serialización para evitar errores con fechas u otros objetos no serializables (como `Date`)
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
