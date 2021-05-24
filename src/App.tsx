import React, { useState, useEffect } from 'react';
import { Route } from 'react-router';
import { useLocation } from 'react-router-dom';
import './App.scss';
import WeatherList from './components/WeatherList/WeatherList';
import WeatherItem from './components/WeatherItem/WeatherItem';

const buildRootClassName = (pathname: string): string => {
  return !pathname || pathname === '/' ? 'weather-app' : 'weather-app weather-by-city'
}

function App() {
  const location = useLocation();
  const [rootClassName, setRootClassName] = useState(buildRootClassName(location.pathname));

  useEffect(() => {
    setRootClassName(buildRootClassName(location.pathname));
  }, [location]);

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
