import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { CSSTransition } from 'react-transition-group';

import { fetchThreeDaysForecast } from '../../store/actions';
import withOwmService from '../hoc';
import './Forecast.css';

const Forecast = ({
  currentCity,
  fetchThreeDaysForecast,
  error,
  transition
}) => {
  const renderError = () => {
    return <h1 className="text-danger text-center">City not found</h1>;
  };

  const renderCity = () => {
    if (currentCity) {
      const {
        name,
        icon,
        description,
        temp,
        humidity,
        wind,
        country,
        id
      } = currentCity;
      const currDate = new Date();
      return (
        <CSSTransition timeout={500} classNames="move" in={transition}>
          <div>
            <h2 className="card-header d-flex flex-wrap justify-content-between">
              {name},{country} <small>{currDate.toLocaleDateString()}</small>
              <div>
                <span>
                  {icon && (
                    <img
                      src={`http://openweathermap.org/img/w/${icon}.png`}
                      alt="weather"
                    />
                  )}{' '}
                  {description}
                </span>
                <span> {Math.round(temp)} &#8451;</span>
              </div>
            </h2>

            <div className="card-body d-flex flex-column lead">
              <span>
                {' '}
                <strong>Humidity:</strong> {humidity}%
              </span>
              <span>
                {' '}
                <strong>Wind:</strong> {wind}m/s
              </span>
              <Link to="/five-days-forecast" className="ml-auto">
                <button
                  className="btn btn-lg btn-primary mt-3"
                  onClick={() => fetchThreeDaysForecast(id)}
                >
                  3-Day Forecast
                </button>
              </Link>
            </div>
          </div>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition timeout={500} classNames="move" in={false}>
        <h1>Please type in the name of the city and press 'enter'</h1>
      </CSSTransition>
    );
  };

  return <div className="Forecast">{error ? renderError() : renderCity()}</div>;
};

const mapDispatchToProps = (dispatch, { owmService }) => {
  return bindActionCreators(
    {
      fetchThreeDaysForecast: fetchThreeDaysForecast(owmService)
    },
    dispatch
  );
};

export default withOwmService(
  connect(
    null,
    mapDispatchToProps
  )(Forecast)
);
