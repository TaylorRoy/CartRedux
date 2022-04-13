import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { isVisible: true, notification: null };

const uiSlice = createSlice({
  name: "ui",
  initialState: initialCartState,
  reducers: {
    toggleCart(state) {
      state.isVisible = !state.isVisible;
    },
    showNotification(state, action) {
      state.notification = {
        status: action.payload.status,
        title: action.payload.title,
        message: action.payload.message,
      };
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
