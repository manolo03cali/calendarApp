import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
  name: "ui",
  initialState: {
    idDateModalOpen: false,
  },
  reducers: {
    onOpenDateModal: (state) => {
      state.idDateModalOpen = true;
    },
    onCloseDateModal: (state) => {
      state.idDateModalOpen = false;
    },
  },
});

//Action creators are generated for each case reducer function
export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;
