import React, { Component } from 'react';
import './CountriesList.scss';

class CountriesList extends Component {
  state = {
    search: '',
  };

  handleOnChange = (event) => {
    this.setState({ search: event.target.value });
  };

  renderCountries = (countries) => {
    return countries.map((country, index) => {
      return (
        <div key={index} className="country-entry" onClick={() => this.props.createCountry(country.name)}>
          <div className="country-flag">
            <img src={country.flag} alt="flag lol" />
          </div>

          <h4>{country.name}</h4>
          {/* <p>Native Name: {country.nativeName}</p> */}
          {/* <p>Population: {country.population}</p> */}
        </div>
      );
    });
  };

  render() {
    console.log(this.props);
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
            <div className="countries-list__all">{this.props.countries && this.renderCountries(filteredCountries)}</div>
          </div>
        </div>
      </>
    );
  }
}

export default CountriesList;
