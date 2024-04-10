import {WeatherCard} from "../entities/WeatherCard/WeatherCard.tsx";
import styles from './WeatherList.module.css'
import {useAppDispatch, useAppSelector} from "../store";
import {useEffect, useState} from "react";
import {fetchWeather} from "../store/weather/weatherSlice.ts";
import {getAllWeather} from "../store/weather/weatherSelector.ts";
import {getAllCity} from "../store/city/citySelector.ts";

export const WeatherList = () => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')

    const dispatch = useAppDispatch()
    const cityNames = useAppSelector(getAllCity)
    const weatherData = useAppSelector(getAllWeather)

    const fetchWeatherData = async () => {
        if (!cityNames) return;

        setIsLoading(true);
        try {
            await Promise.allSettled(
                cityNames.map(({ lat, lon }) =>
                    dispatch(fetchWeather({ lat, lon }))
                )
            );
            setIsLoading(false);
        } catch (error) {
            setError('Произошла ошибка: ' + error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWeatherData()
    }, []);

    if(isLoading){
        return (
            <div>Loading...</div>
        )
    }

    if(error){
        return (
            <h2>{error}</h2>
        )
    }

    return(
        <div className={styles.wrapper} >
            {!isLoading && weatherData.map((item) =>
                <WeatherCard
                    // Поиск не возвращает id городов, поэтому индекс составим из его координат
                    key={`${item.lon} + ${item.lat}`}
                    lon={item.lon}
                    lat={item.lat}
                    cityName={item.cityName}
                    temp={item.currentDay.temp}
                    mainIcon={item.currentDay.icon}
                    main={item.currentDay.main}
                    weatherId={item.currentDay.weatherId}
                    nextDays={item.nextDays}
                />
            )}
            {weatherData.length === 0 && <h2>Ваш список городов пуст</h2>}
        </div>
    )
}
