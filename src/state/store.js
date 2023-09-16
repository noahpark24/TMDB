import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';
import favoriteReducer from './favorite';
import userListReducer from './usersList';
import movieSearchsReducer from './movieSearchs';
import tvshowSearchs from './tvshowSearchs';

const store = configureStore({
  reducer: {
    user: userReducer,
    favorite: favoriteReducer,
    userList: userListReducer,
    movieSearchs: movieSearchsReducer,
    tvshowSearchs: tvshowSearchs,
  },
});

export default store;
