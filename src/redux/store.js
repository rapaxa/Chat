import {configureStore} from '@reduxjs/toolkit'
import authReducer from "./slice/auth";
import localStorageMiddleware from './reduxPersistMiddleware';
import quizSlice from "./slice/quizSlice";

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};

const persistedState = loadState();

export const store = configureStore({
    reducer: {
        auth: authReducer,
        quiz: quizSlice
    },
    preloadedState: persistedState, // Use `preloadedState` to initialize the store with persistedState
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware), // Apply middleware correctly
});