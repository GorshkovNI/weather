import {useEffect, useState} from "react";

export const useDebounce = (value: string, ms: number) => {
    const [debounceValue, setDebounceValue] = useState<string>(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebounceValue(value);
        }, ms);

        return () => {
            clearTimeout(handler);
        };
    }, [value, ms]);

    return debounceValue;
}

