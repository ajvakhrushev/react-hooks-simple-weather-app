import Weather from "../interfaces/Weather";
import WeatherByCity from "../interfaces/WeatherByCity";

const replaceWeatherByCity = (
  list: WeatherByCity[] = [],
  city: string,
  weather: Weather
): WeatherByCity[] => {
  const nextList: WeatherByCity[] = list.filter(
    (next: WeatherByCity) => next.city !== city
  );

  nextList.push({
    city,
    weather,
    datetime: Date.now()
  });

  return nextList;
}

export default function citiesReducer(state: WeatherByCity[] = [], action) {
    switch (action.type) {
      case 'GET_WEATHER_BY_CITY':
        return state;
      case 'GET_WEATHER_BY_CITY_SUCCESS':
        const { city, weather } = action.payload;

        return replaceWeatherByCity(state, city, weather);
      default:
        return state;
    }
  }
  