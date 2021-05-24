import React, { useState, useEffect, useReducer } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import WeatherListItem from '../WeatherListItem';
import { getCitiesEffect } from '../../effects/cities';
import citiesReducer from '../../reducers/cities';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 480,
      backgroundColor: theme.palette.background.paper,
    },
    search: {
      width: '100%',
      maxWidth: 480,
    },
  }),
);

export default function WeatherList() {
  const classes = useStyles();
  const [state, dispatch] = useReducer(citiesReducer, []);
  const [citySearch, setCitySearch] = useState('');
  const [cities, setCities] = useState([] as string[]);

  useEffect(() => getCitiesEffect(dispatch), []);
  useEffect(() => {
    const searchValue: string = citySearch.toLowerCase();
    const cities: string[] = state.filter(
      (next: string) => next.toLowerCase().includes(searchValue)
    );

    setCities(cities);
  }, [citySearch, state]);

  return (
    <div className={classes.root}>
      <TextField
        className={classes.search}
        label="Search the City"
        margin="normal"
        variant="outlined"
        onInput={(event) => setCitySearch((event.target as HTMLInputElement).value)}
        onChange={(event) => setCitySearch((event.target as HTMLInputElement).value)}
      />
      <Typography color="textSecondary" gutterBottom hidden={cities.length < 10}>
        There are {cities.length} results found, but you can see only 10.
        To see the other results, please specify the request
      </Typography>
      <List component="nav" aria-label="main cities">
        {cities.slice(0, 10).map((city: string) => (
          <WeatherListItem key={city} city={city} />
        ))}
      </List>
    </div>
  );
}
