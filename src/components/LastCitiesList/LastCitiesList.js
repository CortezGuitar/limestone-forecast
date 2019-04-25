import React from 'react';
import { connect } from 'react-redux';

import { changeCity } from '../../store/actions';

const LastCitiesList = ({ cities, onCityChange }) => {
  const renderItem = ({ name, id }) => {
    return (
      <button
        className="btn btn-outline-primary m-1"
        key={id}
        onClick={() => onCityChange(id)}
      >
        {name}
      </button>
    );
  };

  return (
    <div className="flex flex-wrap">{cities && cities.map(renderItem)}</div>
  );
};

const mapDispatchToProps = {
  onCityChange: changeCity
};

export default connect(
  null,
  mapDispatchToProps
)(LastCitiesList);
