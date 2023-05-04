import { configureStore } from "@reduxjs/toolkit";
import pairReducer from "./pairSlice"

export const store = configureStore({
    reducer: {
        pair : pairReducer
    }
})