import { createAction, createReducer } from '@reduxjs/toolkit';

export const setUserList = createAction('SET_USER_LIST');

const initialState = [];

export default createReducer(initialState, (builder) => {
  builder.addCase(setUserList, (state, action) => {
    return action.payload;
  });
});
