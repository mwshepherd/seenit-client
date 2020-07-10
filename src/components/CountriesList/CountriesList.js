import React, { Component } from 'react';
import './CountriesList.scss';

class CountriesList extends Component {
  renderCountries = (countries, userCountries) => {
    console.log(userCountries);
    // return countries.map((country, index) => {
    //   // console.log('countries map');
    //   return userCountries.forEach((userCountry) => {
    //     // console.log('userCountry forEach');
    //     // console.log(userCountry.name);
    //     console.log(country);
    //     if (country.name == userCountry.name) {
    //       console.log('country name comparison');
    //       console.log(country);
    //       return (
    //         <div key={index}>
    //           <h3 onClick={() => this.props.createCountry(country.name)}>{country.name}</h3>
    //           {/* <p>Native Name: {country.nativeName}</p> */}
    //           {/* <p>Population: {country.population}</p> */}
    //           {/* <img src={country.flag} alt="flag lol" /> */}
    //         </div>
    //       );
    //     }
    //   });
    // });

    return countries.map((country, index) => {
      return (
        <div key={index} className="country-entry">
          <div className="country-flag">
            <img src={country.flag} alt="flag lol" />
          </div>

          <h3 onClick={() => this.props.createCountry(country.name)}>{country.name}</h3>
          {/* <p>Native Name: {country.nativeName}</p> */}
          {/* <p>Population: {country.population}</p> */}
        </div>
      );
    });
  };

  render() {
    console.log(this.props);
    return <div className="countries-list">{this.props.countries && this.renderCountries(this.props.countries, this.props.userCountries)}</div>;
  }
}

export default CountriesList;
