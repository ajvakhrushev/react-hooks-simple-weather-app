import { filterUniqueValues } from "../models/cities";

export default function citiesReducer(state, action) {
  switch (action.type) {
    case 'GET_CITIES':
      if (!action.payload) {
        return [];
      }

      return action.payload.filter(filterUniqueValues).sort();
    default:
      return state;
  }
}
