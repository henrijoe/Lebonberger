import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../schemas/utilisateurSchemas";

interface UtilisateurSliceState {
  currentUser: UserState;
  listUtilisateur: UserState[];
}

const initialState: UtilisateurSliceState = {
  currentUser: {
    nomUtilisateur: "",
    prenomUtilisateur: "",
    telephoneUtilisateur: "",
    eglise: "",
    statut: "Membre ordinaire",
  },
  listUtilisateur: [],
};

export const utilisateurSlice = createSlice({
  name: "utilisateur",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<Partial<UserState>>) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    addUserToList: (state) => {
      state.listUtilisateur.push({ ...state.currentUser });
      state.currentUser = initialState.currentUser; // Réinitialise après ajout
    },
    resetUserData: (state) => {
      state.currentUser = initialState.currentUser;
    },
  },
});

export const { setUserData, addUserToList, resetUserData } = utilisateurSlice.actions;
export default utilisateurSlice.reducer;
