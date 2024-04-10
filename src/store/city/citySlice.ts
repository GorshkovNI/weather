import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {isNearby} from "../../utils/isNearby.ts";

interface City {
    lon: number
    lat: number
}

interface initialStateProps {
    cityCoord: City[]
}

const cityIdFromStorage = localStorage.getItem('cityCoord');
const defaultCityIds: string[] = [];

const initialState: initialStateProps = {
    cityCoord: cityIdFromStorage ? JSON.parse(cityIdFromStorage) : defaultCityIds
};

export const citySlice = createSlice({
    name: 'cities',
    initialState,
    reducers: {
        addCityCoord: (state, action: PayloadAction<City>) => {
            const existsIndex = state.cityCoord.findIndex(isNearby(action.payload.lon, action.payload.lat))
            if(existsIndex !== -1) return

            state.cityCoord.push(action.payload)
            localStorage.setItem('cityCoord', JSON.stringify(state.cityCoord))
        },
        removeCity: (state, action: PayloadAction<City>) => {
            state.cityCoord = state.cityCoord.filter((item) => {
                return !isNearby(action.payload.lon, action.payload.lat)(item);
            })

            localStorage.setItem('cityCoord', JSON.stringify(state.cityCoord))
        },
        removeAllCity: (state) => {
            state.cityCoord = []
            localStorage.removeItem('cityCoord')
        }
    }
})

export const { addCityCoord, removeCity, removeAllCity } = citySlice.actions;
export default citySlice.reducer;
