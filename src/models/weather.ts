import * as env from '../env.json';
import WeatherByCity from '../interfaces/WeatherByCity';

export const isWeatherDataActual = (weatherByCity: WeatherByCity): boolean => {
  if (!weatherByCity?.datetime) {
    return false;
  }

  return (Date.now() - weatherByCity.datetime) <= env.weatherRefreshTime;
}
