import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-markercluster';


const MyMap = () => (
  <div className="relative w-full h-[89vh] font-sfProDisplay">
    <div className="absolute top-0 left-0 z-0 w-full h-full">
      <MapContainer
        center={[51.0, 19.0]}
        zoom={4}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup>
    <Marker position={[49.8397, 24.0297]} />
    <Marker position={[52.2297, 21.0122]} />
    <Marker position={[51.5074, -0.0901]} />
    </MarkerClusterGroup>;
      </MapContainer>
    </div>
  </div>
);

export default MyMap;
