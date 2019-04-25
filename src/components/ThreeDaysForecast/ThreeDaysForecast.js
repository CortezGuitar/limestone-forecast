import React from 'react';
import { connect } from 'react-redux';

import './ThreeDaysForecast.css';

const ThreeDaysForecast = ({
  forecast,
  name,
  country,
  history,
  transition
}) => {
  const renderItem = day => {
    const currDate = new Date(day.dt_txt);

    return (
      <div className="card lead p-3 m-1" style={{ width: '100%' }} key={day.dt}>
        <strong>
          <span className="border-bottom">{currDate.toLocaleDateString()}</span>
        </strong>
        <div className="lead mt-3 mb-3">
          <span>
            {day.weather[0].icon && (
              <img
                src={`http://openweathermap.org/img/w/${
                  day.weather[0].icon
                }.png`}
                alt="weather"
              />
            )}
            {day.weather[0].description}
          </span>
          <span> {Math.round(day.main.temp)} &#8451;</span>
        </div>
        <div className="mb-3">
          <span>
            <strong> Humidity:</strong> {day.main.humidity}%
          </span>
          <span>
            <strong> Wind:</strong> {day.wind.speed}m/s
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      {name && (
        <h2 className="card-header">
          {name},{country}
        </h2>
      )}
      <div className="d-flex card-body justify-content-between forecast">
        {forecast && forecast.map(renderItem)}
      </div>

      <button className="btn btn-primary" onClick={() => history.goBack()}>
        Back
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  const { threeDaysForecast } = state;
  if (threeDaysForecast) {
    return {
      forecast: threeDaysForecast.threeDaysList,
      name: threeDaysForecast.name,
      country: threeDaysForecast.country
    };
  }
  return {};
};

export default connect(mapStateToProps)(ThreeDaysForecast);
