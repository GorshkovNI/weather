import {configureStore} from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {weatherSlice} from "./weather/weatherSlice.ts";
import {citySlice} from "./city/citySlice.ts";

export const store = configureStore({
    reducer: {
        weather: weatherSlice.reducer,
        city: citySlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
