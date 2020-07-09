import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { icon } from 'leaflet';

import Nav from './components/Nav/Nav';
import ControlPanel from './components/ControlPanel/ControlPanel';
import CountriesList from './components/CountriesList/CountriesList';

class App extends React.Component {
  state = {
    countries: null,
  };
  async componentDidMount() {
    await this.getCountries();
    // console.log(this.state);
  }

  getCountries = async () => {
    const response = await fetch('http://localhost:3000/countries?type=json');
    const data = await response.json();
    this.setState({ countries: data.data });
  };

  render() {
    this.state.countries && console.log(this.state);
    return (
      <>
        <Nav />
        <div className="container">
          <ControlPanel getCountries={this.getCountries} />
          <Map center={[0, 0]} zoom={2}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
            {this.state.countries &&
              this.state.countries.map((country) => {
                return <Marker key={country.name} position={[country.coords[0], country.coords[1]]} />;
              })}
          </Map>
          <CountriesList />
        </div>
      </>
    );
  }
}

export default App;
