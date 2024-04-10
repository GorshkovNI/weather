import {RootState} from "../index.ts";

export const getAllWeather = (state: RootState) =>  state.weather.weatherInfo
