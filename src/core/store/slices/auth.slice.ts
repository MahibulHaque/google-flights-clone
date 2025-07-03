import {createSlice} from '@reduxjs/toolkit';

const namespace = 'auth';

const initialState = {};

const appAuthSlice = createSlice({
  name: namespace,
  initialState,
  reducers: {},
});

export default appAuthSlice.reducer;
