import { createAction, createReducer } from '@reduxjs/toolkit';

export const setSearchedTvShows = createAction('SET_SEARCHE_Tv_Shows');

const initialState = [];

export default createReducer(initialState, (builder) => {
  builder.addCase(setSearchedTvShows, (state, action) => {
    return action.payload;
  });
});
