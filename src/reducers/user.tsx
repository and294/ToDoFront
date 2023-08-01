import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 value: {token: null, name: null},
};

export const userSlice = createSlice({
 name: 'user',

  initialState,
 reducers: {
   signInToStore: (state, action) => {
     state.value.token = action.payload.token;
     state.value.name = action.payload.name;
   },
   logoutFromStore: (state, action) => {
    state.value.token = null;
    state.value.name = null;
  },
 },
});

export const { signInToStore, logoutFromStore } = userSlice.actions;
export default userSlice.reducer;