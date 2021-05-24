import React from 'react';
import { Route } from 'react-router';
import { useParams } from 'react-router-dom';
import './App.scss';
import WeatherList from './components/WeatherList/WeatherList';
import WeatherItem from './components/WeatherItem/WeatherItem';

function App() {
  const { city } = useParams();
  const rootClassName: string = city ? 'weather-app weather-by-city' : 'weather-app';
console.log(city);
  return (
    <div className={rootClassName}>
      <div className="weather-app__left">
        <Route path="/" component={WeatherList} />
      </div>
      <div className="weather-app__right">
        <Route path="/:city" component={WeatherItem} />
      </div>
    </div>
  );
}

export default App;
