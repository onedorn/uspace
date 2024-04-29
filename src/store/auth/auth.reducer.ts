import { createReducer } from '@reduxjs/toolkit';
import { ReducerWithInitialState } from '@reduxjs/toolkit/dist/createReducer';
import {
  resetPassword,
  signInWithEmail,
  signInWithFacebook,
  signInWithGitHub,
  signInWithGoogle,
  signInWithRedirectProvider,
  signInWithTwitter,
  signOutUser,
  signUpWithEmail,
} from './auth.actions';

interface AuthState {
  // user: User | null;
  isLoading: boolean;
  error: string | null;
  email: string | null;
}

const initialState: AuthState = {
  // user: null,
  isLoading: false,
  error: null,
  email: null,
};

export const authReducer: ReducerWithInitialState<AuthState> = createReducer(initialState, (builder): void => {
  builder
    .addCase(signInWithEmail.pending, (state: AuthState): void => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(signInWithEmail.fulfilled, (state: AuthState, action: any): void => {
      // state.user = action.payload.user;
      state.isLoading = false;
    })
    .addCase(signInWithEmail.rejected, (state: AuthState, action: any): void => {
      state.isLoading = false;
      state.error = action.payload.error;
    })
    .addCase(signUpWithEmail.pending, (state: AuthState): void => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(signUpWithEmail.fulfilled, (state: AuthState, action: any): void => {
      // state.user = action.payload.user;
      state.isLoading = false;
    })
    .addCase(signUpWithEmail.rejected, (state: AuthState, action: any): void => {
      state.isLoading = false;
      state.error = action.payload.error;
    })
    .addCase(signInWithGoogle.pending, (state: AuthState): void => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(signInWithGoogle.fulfilled, (state: AuthState, action: any): void => {
      // state.user = action.payload.user;
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
      // state.user = action.payload.user;
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
      // state.user = action.payload.user;
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
      // state.user = action.payload.user;
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
      // state.user = action.payload.user;
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
      // state.user = null;
      state.isLoading = false;
    })
    .addCase(signOutUser.rejected, (state: AuthState, action: any): void => {
      state.isLoading = false;
      state.error = action.payload.error;
    })
    .addCase(resetPassword.pending, (state: AuthState) => {
      state.isLoading = true;
    })
    .addCase(resetPassword.fulfilled, (state: AuthState, action: any) => {
      state.isLoading = false;
      state.email = action.payload.email; // Capture the email for which the reset was sent
      state.error = null;
    })
    .addCase(resetPassword.rejected, (state: AuthState, action: any) => {
      state.isLoading = false;
      state.error = action.payload.error;
    });
});

export default authReducer;
