import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import favoriteReducer from "./favorite";
import userListReducer from "./usersList";

const store = configureStore({
  reducer: {
    user: userReducer,
    favorite: favoriteReducer,
    userList: userListReducer,
  },
});

export default store;
