import styles from './Weather.module.css'
import {Search} from "../../entities/Search/Search.tsx";
import {WeatherList} from "../../widgets/WeatherList.tsx";

export const Weather = () => {

    return(
        <div className={styles.wrapper}>
            <div className={styles.topPart}>
                <Search />
            </div>
            <div className={styles.bottomPart}>
                <WeatherList />
            </div>
        </div>
    )
}
