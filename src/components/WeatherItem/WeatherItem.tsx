import React, { useEffect, useReducer } from 'react';
import { useParams, Link } from 'react-router-dom';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { isWeatherDataActual } from '../../models/weather';
import { getCurrentWeatherByCityEffect } from '../../effects/weather';
import weatherReducer from '../../reducers/weather';
import WeatherByCity from '../../interfaces/WeatherByCity';
import WeatherByCityState from '../../interfaces/WeatherByCityState';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 480,
      backgroundColor: theme.palette.background.paper,
    },
    arrowBack: {
      marginTop: 4,
      marginBottom: 12,
    },

  }),
);

export default function WeatherItem() {
  const classes = useStyles();

  const weatherByCityRaw: string | null = window.localStorage.getItem('weatherByCity');
  const initialState: WeatherByCityState = {
    error: '',
    list: weatherByCityRaw ? JSON.parse(weatherByCityRaw) : []
  };

  const [state, dispatch] = useReducer(weatherReducer, initialState);
  const { city } = useParams();

  useEffect(() => {
    const weatherByCity: WeatherByCity = state.list.find(
      (next: WeatherByCity) => next.city === city
    );

    if (!weatherByCity || !isWeatherDataActual(weatherByCity)) {
      getCurrentWeatherByCityEffect(dispatch, city);
    }
  }, [state.list, city]);

  useEffect(() => {
    window.localStorage.setItem('weatherByCity', JSON.stringify(state.list));
  }, [state.list]);

  const weatherByCity: WeatherByCity = state.list.find(
    (next: WeatherByCity) => next.city === city
  );

  let error = '';

  if (state.error) {
    error = state.error;
  } else if (!weatherByCity || !weatherByCity.weather) {
    error = 'There is no data about your location yet';
  }

  if (error) {
    return (
      <div className={classes.root}>
        <IconButton
          className={classes.arrowBack}
          aria-label="back"
          component={Link}
          to="/"
        >
          <ArrowBack />
        </IconButton>
        <Card className={classes.root}>
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              {city}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {error}            
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }

  const { weather, datetime } = weatherByCity;

  return (
    <div className={classes.root}>
      <IconButton
        className={classes.arrowBack}
        aria-label="back"
        component={Link}
        to="/"
      >
        <ArrowBack />
      </IconButton>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar
              src={weather.condition.icon}
              alt={weather.condition.text}
              aria-label="weather condition"
            ></Avatar>
          }
          title={weather.condition.text}
          subheader={weather.is_day ? 'Day' : 'Night'}
        />
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            {city}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Last updated on server: {weather.last_updated}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Last requested: {new Date(datetime).toLocaleString()}
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Temperature: {weather.temp_c} °C | {weather.temp_f} °F
          </Typography>
          <Typography variant="body1" component="p" gutterBottom>
            Humidity: {weather.humidity} %
          </Typography>
          <Typography variant="body1" component="h3">
            Wind
          </Typography>
          <Typography variant="body2" component="p">
            Wind direction: {weather.wind_dir}
          </Typography>
          <Typography variant="body2" component="p">
            Wind degree: {weather.wind_degree}
          </Typography>
          <Typography variant="body2" component="p">
            Wind speed: {weather.wind_mph} miles per hour
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => getCurrentWeatherByCityEffect(dispatch, city)}
          >Refresh weather</Button>
        </CardActions>
      </Card>
    </div>
  );
}
