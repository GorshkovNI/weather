import styles from './Input.module.css'
import {ChangeEvent, FC} from "react";

interface InputProps {
    value: string
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    onClear: () => void
    placeholder: string
}
export const Input: FC<InputProps> = ({ value, onChange, placeholder, onClear }) => {
    return(
        <div className={styles.wrapper}>
            <label className={styles.wrapperInput}>
                <input value={value} onChange={onChange} placeholder={placeholder} className={styles.input}/>
                <button className={styles.buttonClear} onClick={onClear}>X</button>
            </label>
        </div>
    )
}
