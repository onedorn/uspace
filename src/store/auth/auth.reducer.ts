import { createReducer } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { ReducerWithInitialState } from '@reduxjs/toolkit/dist/createReducer';
import {
  signInUser,
  signInWithFacebook,
  signInWithGitHub,
  signInWithGoogle,
  signInWithRedirectProvider,
  signInWithTwitter,
  signOutUser,
  signUpUser,
} from './auth.actions';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
};

export const authReducer: ReducerWithInitialState<AuthState> = createReducer(initialState, (builder): void => {
  builder
    .addCase(signInUser.pending, (state: AuthState): void => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(signInUser.fulfilled, (state: AuthState, action: any): void => {
      state.user = action.payload.user;
      state.isLoading = false;
    })
    .addCase(signInUser.rejected, (state: AuthState, action: any): void => {
      state.isLoading = false;
      state.error = action.payload.error;
    })
    .addCase(signUpUser.pending, (state: AuthState): void => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(signUpUser.fulfilled, (state: AuthState, action: any): void => {
      state.user = action.payload.user;
      state.isLoading = false;
    })
    .addCase(signUpUser.rejected, (state: AuthState, action: any): void => {
      state.isLoading = false;
      state.error = action.payload.error;
    })
    .addCase(signInWithGoogle.pending, (state: AuthState): void => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(signInWithGoogle.fulfilled, (state: AuthState, action: any): void => {
      state.user = action.payload.user;
      state.isLoading = false;
    })
    .addCase(signInWithGoogle.rejected, (state: AuthState, action: any): void => {
      state.isLoading = false;
      state.error = action.payload.error;
    })
    .addCase(signInWithFacebook.pending, (state: AuthState): void => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(signInWithFacebook.fulfilled, (state: AuthState, action: any): void => {
      state.user = action.payload.user;
      state.isLoading = false;
    })
    .addCase(signInWithFacebook.rejected, (state: AuthState, action: any): void => {
      state.isLoading = false;
      state.error = action.payload.error;
    })
    .addCase(signInWithTwitter.pending, (state: AuthState): void => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(signInWithTwitter.fulfilled, (state: AuthState, action: any): void => {
      state.user = action.payload.user;
      state.isLoading = false;
    })
    .addCase(signInWithTwitter.rejected, (state: AuthState, action: any): void => {
      state.isLoading = false;
      state.error = action.payload.error;
    })
    .addCase(signInWithGitHub.pending, (state: AuthState): void => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(signInWithGitHub.fulfilled, (state: AuthState, action: any): void => {
      state.user = action.payload.user;
      state.isLoading = false;
    })
    .addCase(signInWithGitHub.rejected, (state: AuthState, action: any): void => {
      state.isLoading = false;
      state.error = action.payload.error;
    })
    .addCase(signInWithRedirectProvider.pending, (state: AuthState): void => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(signInWithRedirectProvider.fulfilled, (state: AuthState, action: any): void => {
      state.user = action.payload.user;
      state.isLoading = false;
    })
    .addCase(signInWithRedirectProvider.rejected, (state: AuthState, action: any): void => {
      state.isLoading = false;
      state.error = action.payload.error;
    })
    .addCase(signOutUser.pending, (state: AuthState): void => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(signOutUser.fulfilled, (state: AuthState): void => {
      state.user = null;
      state.isLoading = false;
    })
    .addCase(signOutUser.rejected, (state: AuthState, action: any): void => {
      state.isLoading = false;
      state.error = action.payload.error;
    });
});

export default authReducer;
