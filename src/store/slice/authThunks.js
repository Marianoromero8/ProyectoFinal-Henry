import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db, provider } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      //Guardo el rol en firestore
      // await setDoc(doc(db, "user", user.uid), { email, role });

      await axios.post(
        "https://pf-henry-backend-ts0n.onrender.com/user/create",
        { uid: user.uid, email, role }
      );

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

      //?Obtener el rol del usuario desde firestore
      // const userDoc = await getDoc(doc(db, "user", user.uid));
      // const userData = userDoc.data();

      const response = await axios.get(
        ` https://pf-henry-backend-ts0n.onrender.com/user/${user.uid}`
      );
      const userData = response.data;

      return {
        uid: user.uid,
        email: user.email,
        role: userData.role,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Verifica si el usuario ya existe en la base de datos de tu backend
      const response = await axios.get(
        `https://pf-henry-backend-ts0n.onrender.com/user/${user.uid}`
      );

      let userData;
      if (response.data) {
        // Si existe, obtén los datos del usuario
        userData = response.data;
      } else {
        // Si no existe, crea un nuevo documento para el usuario
        const role = "user"; // Establece un rol predeterminado o según lo que necesites
        await axios.post(
          "https://pf-henry-backend-ts0n.onrender.com/user/create",
          { uid: user.uid, email: user.email, role }
        );
        userData = { email: user.email, role };
      }

      return {
        uid: user.uid,
        email: user.email,
        role: userData.role,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
