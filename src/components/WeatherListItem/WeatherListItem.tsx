import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default function WeatherListItem(props) {
  const to: string = `/${props.city}`;

  return (
    <ListItem button divider component={Link} to={to}>
      <ListItemText primary={props.city} />
    </ListItem>
  );
}
