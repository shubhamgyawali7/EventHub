import { configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import rootReducer from "./rootReducer";
import { PERSIST } from "redux-persist";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // to remain data after refreshed page also
};

const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = configureStore({

reducer :persistedReducer,
//  to remove serializableCheck error due to react-persist
  middleware: (getDefaultMiddlerware) => {
    return getDefaultMiddlerware({
      serializableCheck: {
        ignoreActions: [PERSIST],
      },
    });
  },
});

const persistor = persistStore(store);

export { store, persistor };
