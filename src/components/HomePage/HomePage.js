import React, { Component } from 'react';
import { connect } from 'react-redux';

import Forecast from '../Forecast';
import Input from '../Input';
import LastCitiesList from '../LastCitiesList';

import './HomePage.css';

class HomePage extends Component {
  state = { transition: false };

  onChangeTransition = () => {
    this.setState({ transition: !this.state.transition });
  };

  render() {
    const { city, cities, error } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <Forecast
            currentCity={city}
            error={error}
            transition={this.state.transition}
          />
          <Input changeTransition={this.onChangeTransition} cities={cities} />
          <LastCitiesList cities={cities} transition={this.state.transition} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { currentCity, cities, error } = state;
  return { city: currentCity, cities, error };
};

export default connect(mapStateToProps)(HomePage);
