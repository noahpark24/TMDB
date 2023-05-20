import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import favoriteReducer from "./favorite";

const store = configureStore({
  reducer: {
    user: userReducer,
    favorite: favoriteReducer,
  },
});

export default store;
