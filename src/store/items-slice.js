import { createSlice } from "@reduxjs/toolkit";

const initialCart = { items: [], totalQuantity: 0, changed: false };

const itemsSlice = createSlice({
  name: "items",
  initialState: initialCart,
  reducers: {
    replaceCart(state, action) {
      console.log("replaceCart", action.payload);
      state.totalQuantity = action.payload.totalQuantity;
      state.items = action.payload.items;
    },
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id); //check if already in items array
      console.log(state.items);
      state.totalQuantity++;
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          title: newItem.title,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);
      console.log(existingItem.quantity);
      state.totalQuantity--;
      state.changed = true;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id); //filter by all item.id !== id and set a new state.items object
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
  },
});

export const itemsActions = itemsSlice.actions;

export default itemsSlice;
