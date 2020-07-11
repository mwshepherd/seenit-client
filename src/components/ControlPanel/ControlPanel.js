import React, { Component } from 'react';

import Autocomplete from './Autocomplete';
import './ControlPanel.scss';

class ControlPanel extends Component {
  constructor() {
    super();
    this.match = null;
  }
  state = {
    query: '',
    search: '',
  };

  handleStateChange = (e) => {
    this.setState({ query: e });
  };

  handleOnChange = (event) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = (event) => {
    this.setState({ search: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    event.target.reset();

    const result = this.props.predictiveCountries.find((name) => name === this.state.query);

    if (this.state.query === result) {
      this.props.createCountry(this.state.query);
    }

    this.setState({ query: null });
  };

  renderUsersCountries = (countries, totalCountries) => {
    return countries.map((country) => {
      if (totalCountries.length > 1) {
        this.match = totalCountries.find(({ name }) => name === country.name);
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
            <i className="far fa-times-circle"></i>
          </button>
        </div>
      );
    });
  };

  render() {
    let filteredCountries = this.props.countries
      .sort((a, b) => b.id - a.id)
      .filter((country) => {
        return country.name.toLowerCase().indexOf(this.state.search.toLowerCase()) != -1;
      });

    return (
      <div className="control-panel">
        <div className="total-countries">
          <h1>{this.props.countries.length} / 250</h1>
          <h3>Countries you've visited</h3>
        </div>
        <div className="search">
          <input type="text" placeholder="Search your saved list" onChange={this.handleSearch} />
        </div>
        <div className="user-countries">{this.props.countries && this.renderUsersCountries(filteredCountries, this.props.totalCountries)}</div>
      </div>
    );
  }
}

export default ControlPanel;
