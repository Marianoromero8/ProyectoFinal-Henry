import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, db, provider } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
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
        { uid: user.uid, email, role },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Incluye las credenciales
        }
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

      const response = await axios.get(
        ` https://pf-henry-backend-ts0n.onrender.com/user/${user.uid}`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // Incluye las credenciales
        }
      );
      const userData = response.data;

      if (!userData.active) {
        // Si el usuario no está activo, rechazar con un mensaje
        return rejectWithValue("Your account is banned.");
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


export const googleLogin = createAsyncThunk(
  "auth/googleLogin",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Verifica si el usuario ya existe en la base de datos de tu backend
      let response;
      let userData;

      try {
        response = await axios.get(
          `https://pf-henry-backend-ts0n.onrender.com/user/${user.uid}`,
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // Incluye las credenciales
          }
        );
        userData = response.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // Si el usuario no existe, crea un nuevo documento para el usuario
          const role = "user"; // Establece un rol predeterminado o según lo que necesites
          await axios.post(
            "https://pf-henry-backend-ts0n.onrender.com/user/create",
            { uid: user.uid, email: user.email, role, active: true } // Explicitly set active to true
          );
          userData = { email: user.email, role, active: true };
        } else {
          // Manejar otros tipos de errores si es necesario
          throw error;
        }
      }

      if (!userData.active) {
        return rejectWithValue("Your account is banned.");
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
