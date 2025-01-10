import { InformationState } from './../schemas/informationSchemas';
import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import informationReducer from "./informationSlice";
import utilisateurReducer from "./informationSlice";
import { UserState } from '../schemas/utilisateurSchemas';


export interface IReduxState {
  information:InformationState;
  utilisateur:UserState
}

const reducers = combineReducers({
    information: informationReducer,
    utilisateur: utilisateurReducer,
  });
  
  // Configuration de la persistance
  const persistConfig = {
    key: "root",
    storage: storage,
    whitelist: ["application", "information","utilisateur"], // Liste des slices à persister
  };
  
  // Reducer persistant
  const persistedReducer = persistReducer(persistConfig, reducers);
  
  // Configuration du store Redux avec Redux Toolkit
  export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production", // Activation des devtools en développement
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false, // Désactivation de la vérification de sérialisation (utile avec redux-persist)
      }),
  });
  
  // Types pour l'application
  export type AppDispatch = typeof store.dispatch;
  export type RootState = ReturnType<typeof store.getState>;
  export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
  >;
  