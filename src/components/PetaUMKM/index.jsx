import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, LayersControl } from 'react-leaflet';
import * as turf from '@turf/turf';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Transition } from '@headlessui/react';
import { DonutChart } from './Doughnut.jsx';

const chartData = {
  umkm: 30,
  other: 70,
};

const ExpandableList = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="container flex flex-col items-start rounded shadow-lg">
      <div className="flex items-center mb-2 bg-[#101920] rounded-xl">
        <span className="flex items-center justify-center font-bold w-8 h-8 bg-[#012640] text-white rounded-xl p-2">
          55
        </span>
        <p className="text-sm ml-2 text-left">Pertanian, Kehutanan, Perikanan</p>
      </div>
      <div className="flex items-center mb-2 bg-[#101920] rounded-xl">
        <span className="flex items-center justify-center font-bold w-8 h-8 bg-[#014A77] text-white rounded-xl p-2">
          55
        </span>
        <p className="text-sm ml-2 text-left">Pertanian, Kehutanan, Perikanan</p>
      </div>
      <div className="flex items-center mb-2 bg-[#101920] rounded-xl">
        <span className="flex items-center justify-center font-bold w-8 h-8 bg-[#27273D] text-white rounded-xl p-2">
          55
        </span>
        <p className="text-sm ml-2 text-left">Pertanian, Kehutanan, Perikanan</p>
      </div>
      <div className="flex items-center mb-2 bg-[#101920] rounded-xl">
        <span className="flex items-center justify-center font-bold w-8 h-8 bg-[#6B2836] text-white rounded-xl p-2">
          55
        </span>
        <p className="text-sm ml-2 text-left">Pertanian, Kehutanan, Perikanan</p>
      </div>
      <div className="flex items-center mb-2 bg-[#101920] rounded-xl">
        <span className="flex items-center justify-center font-bold w-8 h-8 bg-[#AF282F] text-white rounded-xl p-2">
          55
        </span>
        <p className="text-sm ml-2 text-left">Pertanian, Kehutanan, Perikanan</p>
      </div>
      {expanded && (
        <div>
          <div className="flex items-center mb-2 bg-[#101920] rounded-xl">
            <span className="flex items-center justify-center font-bold w-8 h-8 bg-blue-600 text-white rounded-xl p-2">
              55
            </span>
            <p className="text-sm ml-2 text-left">Pertanian, Kehutanan, Perikanan</p>
          </div>
          <div className="flex items-center mb-2 bg-[#101920] rounded-xl">
            <span className="flex items-center justify-center font-bold w-8 h-8 bg-blue-600 text-white rounded-xl p-2">
              55
            </span>
            <p className="text-sm ml-2 text-left">Pertanian, Kehutanan, Perikanan</p>
          </div>
          {/* Add more items as needed */}
        </div>
      )}
      <button onClick={handleToggle} className="text-gray-400 text-right items-right text-sm mt-4">
        {expanded ? 'Kembali' : 'Selengkapnya...'}
      </button>
    </div>
  );
};

const Legenda = () => {
  return (
    <div className="absolute bottom-4 right-4 z-10 w-[15%] p-2 mr-[7.5%] bg-white rounded-md shadow-md text-gray-800"
      style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
          backdropFilter: 'blur(12px)', // Blur effect
        }}>
      <div className="font-semibold mb-1 text-right">Jumlah UMKM</div>
      <div className="relative h-6 bg-gradient-to-r from-red-600 to-blue-900 rounded-full">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, #BD0026, #FED976)',
            borderRadius: '99px',
          }}
        ></div>
      </div>
      <div className="flex justify-between mt-1 px-2">
        <span className="text-sm">0</span>
        <span className="text-sm">50+</span>
      </div>
    </div>
  );
};

const Legend = () => {
  const legendItems = [
    { color: '#800026', label: '> 1000' },
    { color: '#BD0026', label: '> 500' },
    { color: '#E31A1C', label: '> 200' },
    { color: '#FC4E2A', label: '> 100' },
    { color: '#FD8D3C', label: '> 50' },
    { color: '#FEB24C', label: '> 20' },
    { color: '#FED976', label: '> 10' },
    { color: '#BD0026', label: '< 10' },
  ];

  return (
    <div className="absolute bottom-4 right-4 z-10 bg-white p-4 rounded-lg shadow-md">
      <h4 className="font-semibold mb-2">Legenda</h4>
      {legendItems.map((item, index) => (
        <div key={index} className="flex items-center mb-2">
          <span className="w-4 h-4" style={{ backgroundColor: item.color }}></span>
          <span className="ml-2 text-sm">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default function MapSection() {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isVisualizationOpen, setIsVisualizationOpen] = useState(true);

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
      density > 500 ? '#BD0026' :
        density > 200 ? '#E31A1C' :
          density > 100 ? '#FC4E2A' :
            density > 50 ? '#FD8D3C' :
              density > 20 ? '#FEB24C' :
                density > 10 ? '#FED976' :
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
    <div className="relative w-full h-[89vh] font-sfProDisplay">
      <div className="absolute top-0 left-0 z-0 w-full h-full">
        <MapContainer
          center={[-7.4388978,112.59942]} // lokasi desa simoanginangin
          zoom={15}
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

      <div className="mx-[10%] font-sfProDisplay">
        <button
          className="absolute top-4 right-[10%] z-10 px-11 py-2 bg-[#AF282F] text-white rounded-xl shadow-md flex items-center"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <span className="material-icons mr-2">filter_list</span>
          Filter
        </button>

        <button
          className="absolute top-4 left-[10%] z-10 px-12 py-2 bg-[#AF282F] text-white rounded-xl shadow-md flex items-center"
          onClick={() => setIsVisualizationOpen(!isVisualizationOpen)}
        >
          <span className="material-icons mr-2">analytics</span>
          Visualisasi
        </button>

        <Transition
          show={isFilterOpen}
          enter="transition ease-out duration-300"
          enterFrom="opacity-0 transform scale-95"
          enterTo="opacity-100 transform scale-100"
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100 transform scale-100"
          leaveTo="opacity-0 transform scale-95"
          className="absolute top-16 right-[10%] z-10 w-64 p-4 bg-[#101920] rounded-md shadow-md text-white"
        >
          <div>
            <label className="block text-sm font-medium text-white">
              Tahun
            </label>
            <select
              id="tahun"
              name="tahun"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-[#2E2E2E] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option>2023</option>
              <option>2024</option>
            </select>

            <label className="block text-sm font-medium text-white mt-4">
              Jenis KBLI
            </label>
            <select
              id="jenis-kbli"
              name="jenis-kbli"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-[#2E2E2E] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option>A. Pertanian</option>
              <option>B. Perikanan</option>
            </select>

            <label className="block text-sm font-medium text-white mt-4">
              RT
            </label>
            <select
              id="rt"
              name="rt"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-[#2E2E2E] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option>12</option>
              <option>13</option>
            </select>
          </div>
        </Transition>

        <Transition
          show={isVisualizationOpen}
          enter="transition ease-out duration-300"
          enterFrom="opacity-0 transform scale-95"
          enterTo="opacity-100 transform scale-100"
          leave="transition ease-in duration-200"
          leaveFrom="opacity-100 transform scale-100"
          leaveTo="opacity-0 transform scale-95"
          className="absolute top-16 left-[10%] z-10 w-64 max-h-[77vh] p-4 bg-[#1D262C] rounded-md shadow-md text-white overflow-y-auto"
        >
          <div className="text-center">
            <div className="mb-4">
              <p className="bg-[#2E2E2E] rounded-full p-1 text-sm font-medium">
                <span className="text-sm material-icons mr-1">location_on</span> RT 12 RW 04 Dsn Pejagalan
              </p>
            </div>
            <div className="bg-[#101920] p-4 rounded-md mb-4 text-left">
              <p className="text-4xl font-bold">200</p>
              <p className="text-xm">Pelaku Usaha Mikro</p>
            </div>
            <div className="bg-[#101920] p-4 rounded-md mb-4 text-left">
              <p className="text-4xl font-bold">55%</p>
              <p className="text-xm">Rumah Tangga UMKM</p>
            </div>
            <div>
              <p className="mb-2 text-left font-xl font-semibold">Sebaran Lapangan Usaha UMKM</p>
              <ExpandableList />
            </div>
            <div className="p-4 rounded-md mb-4">
              <DonutChart data={chartData} />
            </div>
          </div>
        </Transition>

        <Legenda />
      </div>
    </div>
  );
}
