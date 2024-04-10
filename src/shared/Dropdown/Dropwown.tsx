import {FC, ReactNode} from "react";
import styles from './Dropdown.module.css'

interface DropdownProp{
    children: ReactNode
}
export const Dropdown: FC<DropdownProp> = ({children}) => {
    return <div className={styles.dropdown}>{children}</div>
}
