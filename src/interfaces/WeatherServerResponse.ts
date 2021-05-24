import WeatherByCity from './WeatherByCity';
import WeatherLocation from './WeatherLocation';

export default interface WeatherServerResponse {
    location: WeatherLocation;
    current: WeatherByCity;
}