import styles from './WeatherDay.module.css'
import {FC} from "react";

interface WeatherDayProps {
    date: string
    icon: string
    temp: number
}

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const WeatherDay: FC<WeatherDayProps> = ({date, icon, temp}) => {

    const day = days[new Date(date).getDay()]

    return (
        <div className={styles.weatherDayWrap}>
            <div className={styles.weatherDayName}>{day}</div>
            <div className={styles.weatherDayImg}>
                <img src={icon} className={styles.img} alt='type weather' />
            </div>
            <div className={styles.weatherDayTemp}>{temp}°</div>
        </div>
    )
}
