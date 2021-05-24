import React, { useState, useEffect } from 'react';
import { Route } from 'react-router';
import { useLocation } from 'react-router-dom';
import { buildRootClassName } from '../../models/cities';
import WeatherList from '../WeatherList/WeatherList';
import WeatherItem from '../WeatherItem/WeatherItem';

function App() {
  const location = useLocation();
  const [rootClassName, setRootClassName] = useState(
    buildRootClassName(location.pathname)
  );

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
