import {FC} from "react";
import styles from './DropItem.module.css'

interface DropItemProps {
    country: string
    name: string
    state?: string
    lat: number
    lon: number
    onClick: ({lat, lon}: {lon: number, lat: number}) => void
}

export const DropItem: FC<DropItemProps> = ({ country, onClick, state, name, lon, lat }) => {

    const handleReturnCoordinate = () => {
        onClick({lat, lon})
    }

    return(
        <div className={styles.wrapper} onClick={handleReturnCoordinate}>
            <span className={styles.text}>{name}</span>
            <span className={styles.text}>{country}</span>
            <span className={styles.text}>{state}</span>
        </div>
    )
}
