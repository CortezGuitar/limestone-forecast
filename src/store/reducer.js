const updateLastCities = (city, citiesArr) => {
  let newArr = [];
  if (!citiesArr) {
    newArr.push(city);
    return newArr;
  }

  if (citiesArr.length === 5) {
    newArr = [...citiesArr.slice(1), city];
    return newArr;
  }
  newArr = [...citiesArr, city];
  return newArr;
};

const updateCity = (cityId, citiesArr) => {
  const newArr = citiesArr.filter(city => city.id === cityId);
  return newArr[0];
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_FORECAST_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_FORECAST_SUCCESS':
      return {
        ...state,
        cities: updateLastCities(action.payload, state.cities),
        currentCity: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_FORECAST_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
        currentCity: null
      };
    case 'FETCH_THREEDAYSFORECAST_SUCCESS':
      return {
        ...state,
        threeDaysForecast: action.payload,
        loading: false,
        error: null
      };
    case 'FETCH_THREEDAYSFORECAST_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'CHANGE_CITY':
      return {
        ...state,
        currentCity: updateCity(action.payload, state.cities),
        error: null
      };

    default:
      return state;
  }
};

export default reducer;
