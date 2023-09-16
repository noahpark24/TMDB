import { createAction, createReducer } from '@reduxjs/toolkit';

export const setSearchedMovies = createAction('SET_SEARCHED_MOVIES');

const initialState = [];

export default createReducer(initialState, (builder) => {
  builder.addCase(setSearchedMovies, (state, action) => {
    return action.payload;
  });
});
