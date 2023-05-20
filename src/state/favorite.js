import { createAction, createReducer } from "@reduxjs/toolkit";

export const setFavorite = createAction("SET_FAVORITE");

const initialState = {
  movie_name: "",
  movie_id: "",
  poster_path: "",
};

export default createReducer(initialState, {
  [setFavorite]: (state, action) => action.payload,
});
