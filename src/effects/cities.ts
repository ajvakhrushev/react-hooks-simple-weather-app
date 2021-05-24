import cities from '../data/cities.json';

export const getCitiesEffect = (dispatch) => {
  dispatch({type: 'GET_CITIES', payload: cities});
}
