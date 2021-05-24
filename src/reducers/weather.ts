import Weather from "../interfaces/Weather";
import WeatherByCity from "../interfaces/WeatherByCity";
import WeatherByCityState from "../interfaces/WeatherByCityState";

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

export default function weatherReducer(state: WeatherByCityState, action) {
    switch (action.type) {
      case 'GET_WEATHER_BY_CITY':
        state.error = '';

        return state;
      case 'GET_WEATHER_BY_CITY_SUCCESS':
        const { city, weather } = action.payload;

        return {
          ...state,
          list: replaceWeatherByCity(state.list, city, weather)
        };
      case 'GET_WEATHER_BY_CITY_ERROR':
        return {
          ...state,
          error: action.payload
        };
      default:
        return state;
    }
  }
  