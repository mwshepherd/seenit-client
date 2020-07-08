import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import { icon } from 'leaflet';

function App() {
  return (
    <Map center={[0, 0]} zoom={2}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
    </Map>
  );
}

export default App;
