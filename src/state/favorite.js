import { createAction, createReducer } from '@reduxjs/toolkit';

export const setFavorite = createAction('SET_FAVORITE');

const initialState = {
  movie_name: '',
  movie_id: '',
  is_tv_show: false,
  poster_path: '',
};

//RTK 2.0 usa builders
export default createReducer(initialState, (builder) => {
  builder.addCase(setFavorite, (state, action) => {
    return action.payload;
  });
});
