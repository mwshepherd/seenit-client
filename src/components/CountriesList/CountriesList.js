import React, { Component } from 'react';

import './CountriesList.scss';

class CountriesList extends Component {
  render() {
    console.log(this.props);
    return <div className="countries-list">All countries panel</div>;
  }
}

export default CountriesList;
