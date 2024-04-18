import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthSlice {
  user: any;
}

const initialState: AuthSlice = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<any>): void => {},
    deleteUser: (state, action: PayloadAction<any>) => {},
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
