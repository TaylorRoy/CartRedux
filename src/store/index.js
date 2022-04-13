import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";
import itemsSlice from "./items-slice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, items: itemsSlice.reducer },
});

export default store;
