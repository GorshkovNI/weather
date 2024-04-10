import {Input} from "../../shared/Input/Input.tsx";
import {ChangeEvent, useEffect, useState} from "react";
import {useAppDispatch} from "../../store";
import styles from './Search.module.css'
import {Dropdown} from "../../shared/Dropdown/Dropwown.tsx";
import {getListCity} from "./api";
import {useDebounce} from "../../hook/useDebounce/useDebounce.ts";
import {DropItem} from "./components/DropItem/DropItem.tsx";
import {addCityCoord, removeAllCity} from "../../store/city/citySlice.ts";
import {fetchWeather, removeAllCard} from "../../store/weather/weatherSlice.ts";
import {Button} from "../../shared/Button/Button.tsx";

interface ResponseFoundCity {
    country: string
    name: string
    state?: string
    lat: number
    lon: number
}

export const Search = () => {

    const [value, setValue] = useState<string>('')
    const [foundCities, setFoundCities] = useState<ResponseFoundCity[]>([])
    const [showDropdown, setShowDropdown] = useState(false);
    const debounceValue = useDebounce(value, 300)

    const dispatch = useAppDispatch()

    useEffect(() => {

        if(!value){
            setShowDropdown(false)
            return
        }
        const fetchCities = async () => {
            let correctName = debounceValue
            if(debounceValue.split(' ').length > 1){
                correctName = debounceValue.split(' ').join('+')
            }
            const cities = await getListCity(correctName)
            setFoundCities(cities)
            setShowDropdown(true)
        }

        fetchCities()

    }, [debounceValue]);

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const handleChoseCounty = ({lat, lon}: {lon: number, lat: number}) => {
        dispatch(addCityCoord({lat, lon}))
        dispatch(fetchWeather({lat, lon}))
        setShowDropdown(false)
        setValue('')
    }

    const handleClearInput = () => {
        setValue('')
        setShowDropdown(false)
    }

    const handleAllRemove = () => {
        dispatch(removeAllCard())
        dispatch(removeAllCity())
    }

    return(
        <div className={styles.wrapper}>
            <div className={styles.searchBlock}>
                <Input value={value} onChange={handleChangeInput} onClear={handleClearInput} placeholder='Введите город' />
                <div className={styles.positionDropdown}>
                    {showDropdown && <Dropdown>
                        {foundCities.map((item) => {
                            return(
                                <DropItem
                                    // Поиск не возвращает id городов, поэтому индекс составим из его координат
                                    key={`${item.lon} + ${item.lat}`}
                                    country={item.country} name={item.name}
                                    state={item.state}
                                    onClick={handleChoseCounty}
                                    lat={item.lat}
                                    lon={item.lon}
                                />
                            )
                        })}
                    </Dropdown>}
                </div>
            </div>
            <Button  text='Удалить все' onClick={handleAllRemove} background='red' />
        </div>
    )
}
