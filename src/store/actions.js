const forecastRequested = () => {
  return {
    type: 'FETCH_FORECAST_REQUEST'
  };
};

const forecastLoaded = city => {
  return {
    type: 'FETCH_FORECAST_SUCCESS',
    payload: city
  };
};

const forecastError = error => {
  return {
    type: 'FETCH_FORECAST_FAILURE',
    payload: error
  };
};

const threeDaysForecastLoaded = city => {
  return {
    type: 'FETCH_THREEDAYSFORECAST_SUCCESS',
    payload: city
  };
};

const threeDaysForecastError = error => {
  return {
    type: 'FETCH_THREEDAYSFORECAST_FAILURE',
    payload: error
  };
};

const fetchForecast = owmService => city => dispatch => {
  dispatch(forecastRequested());
  owmService
    .getWeather(city)
    .then(data => dispatch(forecastLoaded(data)))
    .catch(error => dispatch(forecastError(error)));
};

const fetchThreeDaysForecast = owmService => id => dispatch => {
  dispatch(forecastRequested());
  owmService
    .getThreeDaysWeather(id)
    .then(data => dispatch(threeDaysForecastLoaded(data)))
    .catch(error => dispatch(threeDaysForecastError(error)));
};

const changeCity = id => {
  return {
    type: 'CHANGE_CITY',
    payload: id
  };
};

export { fetchForecast, changeCity, fetchThreeDaysForecast };
