import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  TwitterAuthProvider,
  UserCredential,
} from 'firebase/auth';
import { auth } from '../../firebase/config';
import { AsyncThunkConfig, GetThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';

export const signInUser = createAsyncThunk(
  'firestoreAuth/signIn',
  async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    { rejectWithValue }: GetThunkAPI<AsyncThunkConfig>
  ) => {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user);
      return { user: userCredential.user };
    } catch (error: any) {
      console.log(error.message);
      return rejectWithValue({ error: error.message });
    }
  }
);

export const signUpUser = createAsyncThunk(
  'firestoreAuth/signUp',
  async (
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    },
    { rejectWithValue }: GetThunkAPI<AsyncThunkConfig>
  ) => {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
      return { user: userCredential.user };
    } catch (error: any) {
      return rejectWithValue({ error: error.message });
    }
  }
);

export const signInWithGoogle = createAsyncThunk('firestoreAuth/signInWithGoogle', async (_, { rejectWithValue }) => {
  try {
    const provider: GoogleAuthProvider = new GoogleAuthProvider();
    const result: UserCredential = await signInWithPopup(auth, provider);
    return { user: result.user };
  } catch (error: any) {
    return rejectWithValue({ error: error.message });
  }
});

export const signInWithFacebook = createAsyncThunk('firestoreAuth/signInWithFacebook', async (_, { rejectWithValue }) => {
  try {
    const provider: FacebookAuthProvider = new FacebookAuthProvider();
    const result: UserCredential = await signInWithPopup(auth, provider);
    return { user: result.user };
  } catch (error: any) {
    return rejectWithValue({ error: error.message });
  }
});

export const signInWithTwitter = createAsyncThunk('firestoreAuth/signInWithTwitter', async (_, { rejectWithValue }) => {
  try {
    const provider: TwitterAuthProvider = new TwitterAuthProvider();
    await signInWithRedirect(auth, provider);
  } catch (error: any) {
    return rejectWithValue({ error: error.message });
  }
});

export const signInWithGitHub = createAsyncThunk('firestoreAuth/signInWithGitHub', async (_, { rejectWithValue }) => {
  try {
    const provider: GithubAuthProvider = new GithubAuthProvider();
    await signInWithRedirect(auth, provider);
  } catch (error: any) {
    return rejectWithValue({ error: error.message });
  }
});

export const signInWithRedirectProvider = createAsyncThunk('firestoreAuth/signInWithRedirectProvider', async (_, { rejectWithValue }) => {
  try {
    const provider: GoogleAuthProvider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  } catch (error: any) {
    return rejectWithValue({ error: error.message });
  }
});

export const signOutUser = createAsyncThunk('firestoreAuth/signOut', async (_, { rejectWithValue }) => {
  try {
    await signOut(auth);
  } catch (error: any) {
    return rejectWithValue({ error: error.message });
  }
});
