import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, LayersControl } from 'react-leaflet';
import * as turf from '@turf/turf';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Transition } from '@headlessui/react';

export default function MapSection() {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Fetch GeoJSON data from a local file or API
    fetch('/geoJson/desa.geojson')
      .then((response) => response.json())
      .then((data) => {
        setGeoJsonData(data);

        // Calculate the centroid of the GeoJSON data
        const centroid = turf.centroid(data);
        const [longitude, latitude] = centroid.geometry.coordinates;

        // Fit the map to the GeoJSON data bounds
        if (mapInstance && data) {
          const geoJsonLayer = L.geoJSON(data);
          mapInstance.fitBounds(geoJsonLayer.getBounds());
        }
      })
      .catch((error) => {
        console.error('Error fetching GeoJSON data:', error);
      });
  }, [mapInstance]);

  // Function to determine style based on feature properties
  const getStyle = (feature) => {
    const density = feature.properties.density || 0;
    return {
      fillColor: getColor(density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
    };
  };

  const getColor = (density) => {
    return density > 1000 ? '#800026' :
           density > 500  ? '#BD0026' :
           density > 200  ? '#E31A1C' :
           density > 100  ? '#FC4E2A' :
           density > 50   ? '#FD8D3C' :
           density > 20   ? '#FEB24C' :
           density > 10   ? '#FED976' :
                            '#BD0026';
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7,
        });

        // Create a popup with the first 10 feature properties
        const popupContent = `<div>
          <strong>Feature Info:</strong><br>
          ${Object.entries(feature.properties)
            .slice(0, 10) // Show only the first 10 properties
            .map(([key, value]) => `${key}: ${value}`)
            .join('<br>')}
        </div>`;
        
        layer.bindPopup(popupContent).openPopup();
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 2,
          color: 'white',
          dashArray: '3',
          fillOpacity: 0.7,
        });

        // Close the popup
        layer.closePopup();
      },
      click: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7,
        });
      }
    });
  };

  return (
    <div className="relative w-full h-[86.5vh]">
      <div className="absolute top-0 left-0 z-0 w-full h-full">
        <MapContainer 
          center={[-7.3187, 112.725]} // Default center, it will be adjusted later
          zoom={14} 
          className="w-full h-full" 
          whenCreated={setMapInstance}
        >
          <LayersControl position="bottomleft">
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Satellite">
              <TileLayer
                url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Streets">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          {geoJsonData && (
            <GeoJSON 
              data={geoJsonData} 
              style={getStyle} 
              onEachFeature={onEachFeature}
            />
          )}
        </MapContainer>
      </div>

      {/* Filter Panel */}
      <div className="fixed z-50" style={{ top: '15vh', right: '1rem' }}>
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="bg-red-600 text-xs text-white px-4 py-2 rounded"
        >
          {isFilterOpen ? 'Close' : 'Open'} Filter
        </button>

        <Transition
          show={isFilterOpen}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-200"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="bg-white shadow-lg p-4 rounded text-xs mt-2 w-72">
            <div className="flex justify-between items-center">
              <h2 className="text-xs font-bold">Filter</h2>
              <button onClick={() => setIsFilterOpen(false)}>x</button>
            </div>
            <div>
              <p>Tahun</p>
              <select className="w-full p-2 border rounded">
                <option value="2023">2023</option>
              </select>
              <p>Jenis KBLI</p>
              <select className="w-full p-2 border rounded">
                <option value="A">Pertanian, Kehutanan</option>
              </select>
              <p>RT</p>
              <select className="w-full p-2 border rounded">
                <option value="12">12</option>
              </select>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );
}
