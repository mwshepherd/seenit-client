import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { icon } from 'leaflet';

import Nav from '../Nav/Nav';
import ControlPanel from '../ControlPanel/ControlPanel';
import CountriesList from '../CountriesList/CountriesList';

class Dashboard extends Component {
  state = {
    user: 'username',
    countries: null,
    totalCountries: null,
  };

  async componentDidMount() {
    await this.getCountries();
    await this.getTotalCountries();
  }

  getCountries = async () => {
    const response = await fetch('http://localhost:3000/countries?type=json', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    this.setState({ user: data.user, countries: data.data });
  };

  getTotalCountries = async () => {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const countries = await response.json();
    this.setState({ totalCountries: countries });
  };

  createCountry = async (query) => {
    const body = {
      country: {
        name: query,
      },
    };

    try {
      await fetch('http://localhost:3000/countries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(body),
      });
      this.getCountries();
    } catch (err) {
      console.log(err);
    }
  };

  deleteCountry = async (id) => {
    await fetch(`http://localhost:3000/countries/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    this.getCountries();
  };

  logOut = () => {
    localStorage.removeItem('token');
    this.props.history.push('/');
  };

  render() {
    // this.state.countries && console.log(this.state);

    console.log(this.state);
    return (
      <>
        <Nav logOut={this.logOut} username={this.state?.user.username} />
        <div className="container">
          <ControlPanel getCountries={this.getCountries} countries={this.state.countries} createCountry={this.createCountry} deleteCountry={this.deleteCountry} />
          <Map center={[0, 0]} zoom={2}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
            {this.state.countries &&
              this.state.countries.map((country) => {
                return <Marker key={country.id} position={[country.coords[0], country.coords[1]]} />;
              })}
          </Map>
          <CountriesList countries={this.state.totalCountries} userCountries={this.state.countries} createCountry={this.createCountry} />
        </div>
      </>
    );
  }
}

export default Dashboard;
