import styles from './WeatherCard.module.css'
import {WeatherDay} from "./components/WeatherDay/WeatherDay.tsx";
import {FC} from "react";
import {backgroundColor} from "./utils.ts";
import {NextDays} from "../../store/weather/types.ts";
import {removeCity} from "../../store/city/citySlice.ts";
import {useAppDispatch} from "../../store";
import {removeCard} from "../../store/weather/weatherSlice.ts";

interface WeatherCardProps {
    mainIcon: string
    temp: number
    cityName: string
    main: string,
    weatherId: number,
    nextDays: NextDays[]
    lon: number
    lat: number
}

export const WeatherCard: FC<WeatherCardProps> = (
    {
        cityName,
        temp,
        mainIcon,
        main,
        nextDays,
        weatherId,
        lon,
        lat
    }) => {

    const dispatch = useAppDispatch()

    const handleDelete = () => {
        dispatch(removeCity({lat, lon}))
        dispatch(removeCard({lat, lon}))
    }

    return(
        <div className={styles.weatherWrapper} style={{backgroundColor: backgroundColor(weatherId)}}>
            <div className={styles.weatherCenter}>
                <div className={styles.weatherImageWrapper}>
                    <img src={mainIcon} className={styles.weatherImage} alt='type weather'/>
                </div>
                <div className={styles.weatherDescription}>
                    <div className={styles.city}>{cityName}</div>
                    <div className={styles.weatherType}>{main}</div>
                </div>
                <div className={styles.weatherTemp}>
                    <span>{temp}°</span>
                </div>
            </div>
            <div className={styles.weatherDays}>
                {nextDays?.map((item) => {
                    return(
                        <WeatherDay key={item.date} temp={item.temp} date={item.date} icon={item.icon} />
                    )
                })}
            </div>
            <div className={styles.buttonDelete} onClick={handleDelete}>X</div>
        </div>
    )
}
