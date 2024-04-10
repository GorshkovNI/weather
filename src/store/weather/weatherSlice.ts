import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {api} from "../../api/http.ts";
import {accWeatherData, City, Forecast, initialStateProps, NextDays, WeatherInfo} from "./types.ts";
import {RootState} from "../index.ts";
import {isNearby} from "../../utils/isNearby.ts";

const initialState: initialStateProps = {
    weatherInfo: []
}

export const fetchWeather = createAsyncThunk(
    'getWeather',
    async ({lat, lon}: {lon: number, lat: number}, {getState, rejectWithValue}) => {
        try {
            const state = getState() as RootState;
            const existingCity = state.weather.weatherInfo.find(isNearby(lon, lat));

            if (existingCity) {
                return rejectWithValue('exist');
            }

            const response = await api.get(`/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=2cfb5f4561a3850e93966d88a2420458`);
            const cityInfo = dtoCityInfo(response);
            const currentDate = new Date().toISOString().split('T')[0];
            const days = extractWeatherByDay(response, currentDate, cityInfo);
            const forecastFurther = generateForecast(days);

            return {
                cityName: cityInfo.cityName,
                lon: cityInfo.lon,
                lat: cityInfo.lat,
                currentDay: cityInfo.currentDay,
                nextDays: forecastFurther
            };
        } catch (e) {
            return rejectWithValue('bad request');
        }
    }
);

const dtoCityInfo = (response: any): WeatherInfo => {
    return {
        cityName: response.data.city.name,
        lon: response.data.city.coord.lon,
        lat: response.data.city.coord.lat,
        nextDays: [],
        weatherId: 0,
        currentDay: {
            temp: 0,
            main: '',
            icon: '',
            description: '',
            weatherId: 0
        }
    };
};

const extractWeatherByDay = (response: any, currentDate: string, cityInfo: WeatherInfo): Record<string, accWeatherData> => {
    const days: Record<string, accWeatherData> = {};

    response.data.list.forEach((currentData: Forecast)  => {
        const date = currentData.dt_txt.split(' ')[0];
        if (date === currentDate) {
            cityInfo.currentDay = {
                temp: Number((currentData.main.temp).toFixed(0)),
                main: currentData.weather[0].main,
                icon: `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`,
                description: currentData.weather[0].description,
                weatherId: currentData.weather[0].id
            };
        } else {
            if (!days[date]) {
                days[date] = {
                    temp: 0,
                    count: 0,
                    main: currentData.weather[0].main,
                    icon: currentData.weather[0].icon,
                    description: currentData.weather[0].description
                };
            }
            days[date].temp += currentData.main.temp;
            days[date].count += 1;
        }
    });
    return days;
};

const generateForecast = (days: Record<string, accWeatherData>): NextDays[] => {
    return Object.keys(days).map(date => {
        return {
            date: date,
            temp: Number((days[date].temp / days[date].count).toFixed(0)),
            main: days[date].main,
            icon: `https://openweathermap.org/img/wn/${days[date].icon}@2x.png`,
            description: days[date].description
        };
    });
};

export const weatherSlice = createSlice({
    name: 'weathers',
    initialState,
    reducers: {
        removeCard: (state, action: PayloadAction<City>) => {
            state.weatherInfo = state.weatherInfo.filter((item) => {
                return !isNearby(action.payload.lon, action.payload.lat)(item)
            });
        },
        removeAllCard: (state) => {
            state.weatherInfo = []
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWeather.fulfilled, (state, action) => {
            state.weatherInfo.push(action.payload as WeatherInfo)
        })
        builder.addCase(fetchWeather.rejected, (_, action) => {
            switch (action.payload) {
                case 'exist':
                    alert('Вы уже добавили город');
                    break;
                case 'bad request':
                    alert('Ошибка при запросе города');
                    break;
                default:
                    alert('Неизвестная ошибка');
            }
        })
    }
})

export const { removeCard, removeAllCard } = weatherSlice.actions
export default weatherSlice.reducer
