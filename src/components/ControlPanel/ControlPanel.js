import React, { Component } from 'react';

import Autocomplete from './Autocomplete';
import './ControlPanel.scss';

class ControlPanel extends Component {
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
      let match = this.props.totalCountries.find(({ name }) => name === country.name);
      console.log(match);
      return (
        <div key={country.id} className="user-countries__country">
          <div className="user-countries__flag">{/* <img src={match.flag} /> */}</div>
          <div className="user-countries__country-name">{country.name}</div>
          <button className="user-countries__country-delete" onClick={() => this.props.deleteCountry(country.id)}>
            delete
          </button>
        </div>
      );
    });
  };

  render() {
    // console.log(this.state);
    console.log(this.props);
    return (
      <div className="control-panel">
        <div className="form-container">
          <h3>Search for country</h3>
          <form onSubmit={this.handleSubmit}>
            {/* <input type="text" placeholder="Country" onChange={this.handleOnChange} /> */}
            <Autocomplete suggestions={this.props.predictiveCountries} handleOnChange={this.handleOnChange} handleStateChange={this.handleStateChange} />
          </form>
        </div>

        <div className="user-countries">
          <h3>Countries you've seent</h3>
          {this.props.countries && this.renderUsersCountries()}
        </div>
      </div>
    );
  }
}

export default ControlPanel;
