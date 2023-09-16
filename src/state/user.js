import { createAction, createReducer } from '@reduxjs/toolkit';

export const setUser = createAction('SET_USER');

const initialState = {
  user_name: '',
  email: '',
  password: '',
};

export default createReducer(initialState, (builder) => {
  builder.addCase(setUser, (state, action) => {
    return action.payload;
  });
});
