import React, { Component } from 'react';
import './CountriesList.scss';

class CountriesList extends Component {
  constructor() {
    super();
    this.match = null;
  }

  state = {
    search: '',
  };

  handleOnChange = (event) => {
    this.setState({ search: event.target.value });
  };

  renderCountries = (countries, userCountries) => {
    return countries.map((country, index) => {
      this.match = userCountries.find(({ name }) => name === country.name);

      return (
        <div key={index} className={this.match ? 'country-entry selected' : 'country-entry'} onClick={() => this.props.createCountry(country.name)}>
          <div className="country-flag">
            <img src={country.flag} alt="flag lol" />
          </div>

          <h4>{country.name}</h4>
          {/* {this.match ? <h4>Selected</h4> : null} */}
          {/* <p>Native Name: {country.nativeName}</p> */}
          {/* <p>Population: {country.population}</p> */}
        </div>
      );
    });
  };

  render() {
    let filteredCountries = this.props.countries.filter((country) => {
      return country.name.toLowerCase().indexOf(this.state.search.toLowerCase()) != -1;
    });

    return (
      <>
        <div className="right-panel">
          <div className="countries-list__search">
            {/* <h3>Search country</h3> */}
            <input type="text" placeholder="Search countries" onChange={this.handleOnChange} />
          </div>

          <div className="countries-list">
            <div className="countries-list__all">{this.props.countries && this.renderCountries(filteredCountries, this.props.userCountries)}</div>
          </div>
        </div>
      </>
    );
  }
}

export default CountriesList;
