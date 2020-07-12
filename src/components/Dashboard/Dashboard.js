import React, { Component } from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { icon } from 'leaflet';
import { backendServer } from '../../shared/constants';

import Nav from '../Nav/Nav';
import ControlPanel from '../ControlPanel/ControlPanel';
import CountriesList from '../CountriesList/CountriesList';

class Dashboard extends Component {
  state = {
    user: 'username',
    countries: [],
    totalCountries: [],
    activeCountry: null,
    selectedCountry: '',
  };

  async componentDidMount() {
    await this.getCountries();
    await this.getTotalCountries();
  }

  setSelectedCountry = (country) => {
    this.setState({ selectedCountry: country });
  };

  getCountries = async () => {
    const response = await fetch(`${backendServer}/countries?type=json`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    const data = await response.json();
    this.setState({ user: data.user, countries: data.data, selectedCountry: '' });
  };

  getTotalCountries = async () => {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const countries = await response.json();
    this.setState({ totalCountries: countries });
  };

  createCountry = async (query) => {
    const match = this.state.countries.find(({ name }) => name === query);

    if (match === undefined) {
      const body = {
        country: {
          name: query,
        },
      };

      try {
        await fetch(`${backendServer}/countries`, {
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
    } else {
      console.log('You already have this in your list');
    }
  };

  deleteCountry = async (id) => {
    await fetch(`${backendServer}/countries/${id}`, {
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

  matchActiveCountry = (activeCountry) => {
    const match = this.state.totalCountries.find(({ name }) => name === activeCountry.name);
    this.setState({ activeCountry: match, activeCountryLatLng: activeCountry.coords });
  };

  render() {
    console.log(this.state);
    const { activeCountry, activeCountryLatLng } = this.state;
    return (
      <>
        <Nav logOut={this.logOut} username={this.state?.user.username} />
        <div className="dashboard-container">
          <ControlPanel
            getCountries={this.getCountries}
            countries={this.state.countries}
            createCountry={this.createCountry}
            deleteCountry={this.deleteCountry}
            totalCountries={this.state.totalCountries}
          />
          <Map center={[0, 0]} zoom={2} minZoom={2}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />

            {this.state.countries &&
              this.state.countries.map((country) => {
                return <Marker key={country.id} position={[country.coords[0], country.coords[1]]} onClick={() => this.matchActiveCountry(country)} />;
              })}

            {activeCountry && (
              <Popup position={[activeCountryLatLng[0], activeCountryLatLng[1]]} onClose={() => this.setState({ activeCountry: null })}>
                <div>
                  <img src={activeCountry.flag} style={{ maxWidth: '100px' }} />
                  <h2>{activeCountry.name}</h2>
                  <div className="native-name">
                    <b>Native name:</b> {activeCountry.nativeName}
                  </div>
                  <div className="region">
                    <b>Region:</b> {activeCountry.region}
                  </div>
                  <div className="population">
                    <b>Population:</b> {activeCountry.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  </div>
                  <div className="language">
                    <b>Language:</b> {activeCountry.languages[0].name}
                  </div>
                  <div className="capital">
                    <b>Capital:</b> {activeCountry.capital}
                  </div>
                </div>
              </Popup>
            )}
          </Map>
          <CountriesList
            countries={this.state.totalCountries}
            userCountries={this.state.countries}
            createCountry={this.createCountry}
            setSelectedCountry={this.setSelectedCountry}
            selectedCountry={this.state.selectedCountry}
          />
        </div>
      </>
    );
  }
}

export default Dashboard;
