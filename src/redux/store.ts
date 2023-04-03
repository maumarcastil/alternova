import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { cartSlice } from "./slices/cart";
import { productsSlice } from "./slices/products";
import thunk from 'redux-thunk';
import { userSlice } from './slices/user';

const reducers = combineReducers({
    user: userSlice.reducer,
    cart: cartSlice.reducer,
    products: productsSlice.reducer,
});

const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["cart", "user"],
}

const persistedReducer = persistReducer<RootState>(persistConfig, reducers)


export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk],
    devTools: true,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch