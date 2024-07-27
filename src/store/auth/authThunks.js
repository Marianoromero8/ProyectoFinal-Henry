import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return {
        uid: user.uid,
        email: user.email,
        role: role, // Guarda el rol del usuario
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      return { uid: user.uid, email: user.email };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
