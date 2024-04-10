export interface NextDays {
    date: string
    temp: number
    main: string
    icon: string
    description: string
}

export interface City {
    lon: number
    lat: number
}

export type accWeatherData = Omit<NextDays, 'date'> & { count: number };

export interface Forecast {
    dt_txt: string;
    main: {
        temp: number;
    };
    weather: {
        id: number,
        main: string;
        icon: string;
        description: string;
    }[];
}

export interface WeatherInfo{
    lon: number
    lat: number
    cityName: string
    weatherId: number
    currentDay: Omit<NextDays, 'date'> & {weatherId: number}
    nextDays: NextDays[]
}
export interface initialStateProps {
    weatherInfo: WeatherInfo[]
}
