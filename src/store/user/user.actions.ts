import { User } from 'firebase/auth';
import { createAction } from '@reduxjs/toolkit';

export const authUserRequest = createAction('auth/userRequest');
export const authUserSuccess = createAction<Partial<User>>('auth/userSuccess');
export const authUserFailure = createAction<{ message: string }>('auth/userFailure');
export const authUserLeave = createAction('auth/useLeave');
