import Weather from './Weather';

export default interface WeatherByCity {
    weather: Weather;
    datetime: number;
    city: string;
}
