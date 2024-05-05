import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/taskSlice.js';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './reducer';


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);



  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck:false,immutableCheck:false}),
  });
  

const persistor = persistStore(store);

export { store, persistor };