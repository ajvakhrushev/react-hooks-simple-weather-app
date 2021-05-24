import axios, { AxiosError, AxiosResponse } from 'axios';
import * as env from '../env.json';
import WeatherServerResponse from '../interfaces/WeatherServerResponse';

export const getCurrentWeatherByCity = (city: string): Promise<AxiosResponse<WeatherServerResponse>> => {
  return axios.get(
    `http://api.weatherapi.com/v1/current.json?key=${env.apiKey}&q=${city}&aqi=no`
  );
}

export const getCurrentWeatherByCityEffect = (dispatch, city: string) => {
  dispatch({type: 'GET_WEATHER_BY_CITY'});
  
  getCurrentWeatherByCity(city).then(
    (response: AxiosResponse<WeatherServerResponse>): void => {
      if (response?.data?.current) {
        dispatch({
          type: 'GET_WEATHER_BY_CITY_SUCCESS',
          payload: {city, weather: response.data.current}
        });


      } else {
        dispatch({type: 'GET_WEATHER_BY_CITY_ERROR', payload: 'Error has been occurred'});
      }
    },
    (error: AxiosError): void => {
      let message: string[] = [];

      if (error?.response?.status) {
        message.push(error.response.status.toString());
      }

      if (error?.response?.statusText) {
        message.push(error.response.statusText);
      }

      if (error?.message) {
        message.push(error.message);
      }

      dispatch({
        type: 'GET_WEATHER_BY_CITY_ERROR',
        payload: message.join(' - ')
      })
    }
  );
}
