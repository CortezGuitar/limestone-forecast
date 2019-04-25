import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import withOwmService from '../hoc';
import { fetchForecast, changeCity } from '../../store/actions';

class Input extends Component {
  state = {
    value: ''
  };

  onSubmitHandler = e => {
    e.preventDefault();
    let existCity = this.props.cities;
    let newArr = [];

    if (existCity) {
      newArr = existCity.filter(
        city => city.name.toLowerCase() === this.state.value.toLowerCase()
      );
    }

    if (newArr.length > 0) {
      this.props.onCityChange(newArr[0].id);
      this.setState({ value: '' });
    } else {
      this.props.fetchForecast(this.state.value);
      this.setState({ value: '' });
      this.props.changeTransition();
    }
  };

  onChangeHandler = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    return (
      <div>
        <form className="form-group" onSubmit={this.onSubmitHandler}>
          <input
            type="text"
            placeholder="City..."
            className="form-control form-control-lg"
            value={this.state.value}
            onChange={this.onChangeHandler}
            minLength="3"
          />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { owmService }) => {
  return bindActionCreators(
    {
      fetchForecast: fetchForecast(owmService),
      onCityChange: changeCity
    },
    dispatch
  );
};

export default withOwmService(
  connect(
    null,
    mapDispatchToProps
  )(Input)
);
