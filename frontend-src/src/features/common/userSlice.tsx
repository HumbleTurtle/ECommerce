import {createSlice} from '@reduxjs/toolkit';
import { api } from 'api/api';

const slice = createSlice({
  name: 'user',

  initialState: (() => {
    const initialValue = {
      username: null,
      isAuthenticated: false,
    };

    if (typeof window == 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem('user');
      // Parse stored json or if none return initialValue

      const value = item ? JSON.parse(item) : initialValue;

      if (item) {
        value.isAuthenticated = true;
      }

      return value;
    } catch (e) {
      return initialValue;
    }
  })(),

  reducers: {
    // No nos preocupamos de clonar el state ya que se usa immer por debajo
    saveUser: (state, action) => {
      try {
        const payload = action.payload;

        state.username = payload.username;
        state.isAuthenticated = true;

        return state;
      } catch (ex) {
        console.log(ex);
      }
    },

    removeUser: (state, action) => {
      state.username = null;
      state.isAuthenticated = false;
      return state;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher( api.endpoints.logout.matchFulfilled,
    (state,action) => {
      state.username = null;
      state.isAuthenticated = false;
      return state;
    })
  },
});

export const {saveUser, removeUser} = slice.actions;
export default slice.reducer;
