import styles from './Button.module.css'
import {FC} from "react";

interface ButtonProps {
    text: string
    onClick: () => void
    background: string
}
export const Button: FC<ButtonProps> = ({text, onClick, background}) => {
    return(
        <button className={styles.button} onClick={onClick} style={{backgroundColor: background}}>{text}</button>
    )
}
