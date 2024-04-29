import { ActionReducerMapBuilder, createReducer } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { ReducerWithInitialState } from '@reduxjs/toolkit/dist/createReducer';
import { authUserFailure, authUserLeave, authUserRequest, authUserSuccess } from './user.actions';

export interface UserState {
  user: Partial<User> | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: true,
  error: null,
};

export const userReducer: ReducerWithInitialState<UserState> = createReducer(initialState, (builder: ActionReducerMapBuilder<UserState>): void => {
  builder
    .addCase(authUserRequest, (state: UserState): void => {
      state.loading = true;
      state.error = null;
    })
    .addCase(authUserSuccess, (state: UserState, action: { payload: Partial<User> }): void => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    })
    .addCase(authUserFailure, (state: UserState, action: { payload: { message: string } }): void => {
      state.user = null;
      state.loading = false;
      state.error = action.payload.message;
    })
    .addCase(authUserLeave, (state: UserState): void => {
      state.user = null;
      state.loading = false;
      state.error = null;
    });
});

export default userReducer;
