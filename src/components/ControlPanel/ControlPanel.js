import React, { Component } from 'react';

import Autocomplete from './Autocomplete';
import './ControlPanel.scss';

class ControlPanel extends Component {
  constructor() {
    super();
    this.match = null;
  }
  state = {
    query: null,
  };

  handleStateChange = (e) => {
    this.setState({ query: e });
  };

  handleOnChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();

    const result = this.props.predictiveCountries.find((name) => name === this.state.query);

    console.log(result);

    if (this.state.query === result) {
      this.props.createCountry(this.state.query);
    }

    this.setState({ query: null });
  };

  renderUsersCountries = () => {
    return this.props.countries.map((country) => {
      if (this.props.totalCountries.length > 1) {
        this.match = this.props.totalCountries.find(({ name }) => name === country.name);
      }

      return (
        <div key={country.id} className="user-countries__country">
          {this.match && (
            <>
              <div className="user-countries__flag">
                <img src={this.match.flag} />
              </div>
              {/* <div className="population">{this.match.population}</div> */}
            </>
          )}
          <div className="user-countries__country-name">{country.name}</div>
          <button className="user-countries__country-delete" onClick={() => this.props.deleteCountry(country.id)}>
            <i class="far fa-times-circle"></i>
          </button>
        </div>
      );
    });
  };

  render() {
    // console.log(this.state);
    console.log(this.props);
    console.log(this.props.countries.length);
    return (
      <div className="control-panel">
        <div className="total-countries">
          <h1>{this.props.countries.length} / 250</h1>
          <h3>Countries you've seent</h3>
        </div>
        <div className="user-countries">{this.props.countries && this.renderUsersCountries()}</div>
      </div>
    );
  }
}

export default ControlPanel;
