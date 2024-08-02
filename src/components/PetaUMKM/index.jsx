import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, LayersControl, Marker } from 'react-leaflet';
import * as turf from '@turf/turf';
import 'leaflet/dist/leaflet.css';
import L, { divIcon } from 'leaflet';
import { Transition } from '@headlessui/react';
import { DonutChart } from './Doughnut.jsx';
import api from '../../utils/api.js';
import { message } from 'antd'; 
import CountUp from 'react-countup';

const ExpandableList = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="container flex flex-col items-start rounded shadow-lg">
    <table className="w-full">
      <tbody>
      <tr className="flex items-center mb-2 mr-0 bg-[#101920] rounded-xl w-full">
          <td className="items-center justify-center font-bold w-8 h-8 bg-[#012640] text-white rounded-xl p-2">
            55
          </td>
          <td className="text-sm ml-2 mr-0 text-left w-100">Pertanian, Kehutanan, Perikanan</td>
        </tr>
        <tr className="flex items-center mb-2 bg-[#101920] rounded-xl">
          <td className="flex items-center justify-center font-bold w-8 h-8 bg-[#014A77] text-white rounded-xl p-2">
            55
          </td>
          <td className="text-sm ml-2 text-left">Pertambangan dan Penggalian</td>
        </tr>
        <tr className="flex items-center mb-2 bg-[#101920] rounded-xl">
          <td className="flex items-center justify-center font-bold w-8 h-8 bg-[#27273D] text-white rounded-xl p-2">
            55
          </td>
          <td className="text-sm ml-2 text-left">Industri Pengolahan</td>
        </tr>
        <tr className="flex items-center mb-2 bg-[#101920] rounded-xl">
          <td className="flex items-center justify-center font-bold w-8 h-8 bg-[#6B2836] text-white rounded-xl p-2">
            55
          </td>
          <td className="text-sm ml-2 text-left">Pengadaan Listrik dan Gas</td>
        </tr>
        <tr className="flex items-center mb-2 bg-[#101920] rounded-xl">
          <td className="flex items-center justify-center font-bold w-8 h-8 bg-[#AF282F] text-white rounded-xl p-2">
            55
          </td>
          <td className="text-sm ml-2 text-left">Pertanian, Kehutanan, Perikanan</td>
        </tr>
        {expanded && (
          <>
            <tr className="flex items-center mb-2 bg-[#101920] rounded-xl">
              <td className="flex items-center justify-center font-bold w-8 h-8 bg-blue-600 text-white rounded-xl p-2">
                55
              </td>
              <td className="text-sm ml-2 text-left">Pertanian, Kehutanan, Perikanan</td>
            </tr>
            <tr className="flex items-center mb-2 bg-[#101920] rounded-xl">
              <td className="flex items-center justify-center font-bold w-8 h-8 bg-blue-600 text-white rounded-xl p-2">
                55
              </td>
              <td className="text-sm ml-2 text-left">Pertanian, Kehutanan, Perikanan</td>
            </tr>
            {/* Add more items as needed */}
          </>
        )}
      </tbody>
    </table>
    <button onClick={handleToggle} className="text-gray-400 text-right items-right text-sm mt-4">
      {expanded ? 'Kembali' : 'Selengkapnya...'}
    </button>
  </div>
  );
};

const Legenda = () => {
  return (
    <div className="absolute bottom-4 right-4 z-10 w-[8rem] p-2 mr-[8%] bg-white rounded-md shadow-md text-gray-800"
      style={{
          backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background
          backdropFilter: 'blur(12px)', // Blur effect
        }}>
      <div className="font-semibold text-sm mb-1 text-right">Jumlah UMKM</div>
      <div className="relative h-6 bg-gradient-to-r from-red-600 to-blue-900 rounded-full">
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, #FED976,#FEB24C, #FD8D3C, #FC4E2A, #E31A1C,#BD0026, #800026)',
            borderRadius: '99px',
          }}
        ></div>
      </div>
      <div className="flex justify-between mt-1 px-2">
        <span className="text-xs">0</span>
        <span className="text-xs">100+</span>
      </div>
    </div>
  );
};

export default function MapSection() {
  // const [geoJsonData, setGeoJsonData] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isVisualizationOpen, setIsVisualizationOpen] = useState(true);
  const [data, setData] = useState([]);
  const [dataAgregat, setDataAgregat] = useState([]);
  const [selectedRT, setSelectedRT] = useState('desa');
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(data[0]);
  const [chartData, setChartData] = useState([]);

  const fetchData = async () => {
    setLoading(true); // Mulai loading
    try {
      const response = await api.get("/api/rt/all/geojson");
      setData(response.data.data); // Update state dengan data dari API
      console.log("Data fetched:", response.data.data);
    } catch (error) {
      // Cek jika error memiliki respons body
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(
          `Terjadi kesalahan: ${error.response.data.message}`,
          5
        );
      } else {
        // Jika error tidak memiliki respons body yang dapat diakses
        message.error(
          `Terjadi kesalahan: ${error.message}`,
          5
        );
      }
    } finally {
      setLoading(false); // Akhiri loading
    }
  };

  const fetchDataAgregat = async () => {
    setLoading(true); // Mulai loading
    try {
      const response = await api.get("/api/rt/all/aggregate");
      setDataAgregat(response.data.data); // Update state dengan data dari API
      console.log("Data fetched:", response.data.data);
    } catch (error) {
      // Cek jika error memiliki respons body
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(
          `Terjadi kesalahan: ${error.response.data.message}`,
          5
        );
      } else {
        // Jika error tidak memiliki respons body yang dapat diakses
        message.error(
          `Terjadi kesalahan: ${error.message}`,
          5
        );
      }
    } finally {
      setLoading(false); // Akhiri loading
    }
  };

  useEffect(() => {
    // Fetch data from API
    fetchData();
    fetchDataAgregat();
  }, [  ])

  
  useEffect(() => {
    if (selectedRT === 'desa') {
      setFilteredData(data[0]);
    } else {
      const filtered = data.find(item => item.features[0].properties.rt === selectedRT);
      setFilteredData(filtered || data[0]); // Fallback to data[0] if no match is found
    }
  }, [selectedRT, data]);

  useEffect(() => {
    if (filteredData) {
      const chartData = {
        name: filteredData.features[0].properties.rt,
        value: filteredData.features[0].properties.jml_umkm,
      };
      setChartData([chartData]);
    }
  }, [filteredData]);

  // Function to determine style based on feature properties
  const getStyle = (data) => {
    const density = data.features[0].properties.jml_umkm || 0;
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
    return density > 100 ? '#800026' :
      density > 50 ? '#BD0026' :
        density > 20 ? '#E31A1C' :
          density > 10 ? '#FC4E2A' :
            density > 5 ? '#FD8D3C' :
              density > 2 ? '#FEB24C' :
                density > 0 ? '#FED976' :
                  '#000000';
  };

  const createLabel = (feature) => {
    let center;
    if (feature.geometry.type === "Polygon" || feature.geometry.type === "MultiPolygon") {
      // Mengambil koordinat pusat untuk Polygon dan MultiPolygon
      center = getPolygonCenter(feature.geometry.coordinates[0]);
    } else {
      // Menggunakan koordinat langsung jika tidak Polygon atau MultiPolygon
      center = feature.geometry.coordinates;
    }

    return (
      <Marker
        key={feature.properties.kode}
        position={center}
        icon={divIcon({
          className: 'custom-label',
          html: `<div>${feature.properties.label || 'No label'}</div>`
        })}
      />
    );
  };

  const getPolygonCenter = (coordinates) => {
    let latSum = 0, lngSum = 0, totalPoints = coordinates.length;
    coordinates.forEach(coord => {
      latSum += coord[1];
      lngSum += coord[0];
    });
    return [latSum / totalPoints, lngSum / totalPoints];
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

        // Define the keys you want to display
        const keysLayer = ['RT', 'RW', 'Dusun', 'Jumlah Rumah Tangga', 'Jumlah UMKM', "UMKM Tetap", "UMKM Non-Tetap"];
        const keysToShow = ['rt', 'rw', 'dusun', 'jml_ruta', 'jml_umkm','jml_umkm_tetap','jml_umkm_nontetap'];

        // Create a popup with the specified keys
        const popupContent = `<div>
          <strong>Informasi:</strong><br>
          ${keysToShow.map((key, index) => `${keysLayer[index]}: ${feature.properties[key]}`).join('<br>')}
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

  function calculateCentroid(multiPolygon) {
    let totalX = 0, totalY = 0, totalPoints = 0;

    multiPolygon.coordinates.forEach(polygon => {
        polygon.forEach(ring => {
            ring.forEach(coordinate => {
                totalX += coordinate[0];
                totalY += coordinate[1];
                totalPoints++;
            });
        });
    });

    const centroidX = totalX / totalPoints;
    const centroidY = totalY / totalPoints;

    return [centroidY, centroidX]; // Return as an array of floats
}


  return (
    <div className="relative w-full h-[89vh] font-sfProDisplay">
      <div className="absolute top-0 left-0 z-0 w-full h-full">
      {data.length > 0 && (
        <MapContainer
          center={[-7.4388978,112.59942]} // lokasi desa simoanginangin
          zoom={15}
          scrollWheelZoom={true}
          className="w-full h-full"
          touchZoom={true}
          whenCreated={setMapInstance}
        >
        <LayersControl position="bottomleft">
          <LayersControl.BaseLayer checked name="Google Sattelite">
          <TileLayer
            url="https://mt.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
          />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Google Street">
            <TileLayer
              url="https://mt.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
              attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        {data.map((geoJsonData, index) => (
          <>
        <GeoJSON
        key={index}
          data={geoJsonData}
          style={getStyle(geoJsonData)}
          onEachFeature={onEachFeature}
        />
        <Marker
        key={geoJsonData.features[0].properties.kode}
        position={calculateCentroid(geoJsonData.features[0].geometry)}
        icon={divIcon({
          className: 'custom-label',
          html: `<div class="w-[75px] text-white text-[0.8rem] font-bold absolute p-2"
          style="
            -webkit-text-stroke-width: 0.1px;
            -webkit-text-stroke-color: black;
            text-shadow: 1px 1px #000;
          ">RT ${geoJsonData.features[0].properties.rt || 'No label'}</div>`
            })}
      />
      </>
        ))}
        </MapContainer>
      )}
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
              <option value="2024">2024</option>
            </select>

            <label className="block text-sm font-medium text-white mt-4">
              Jenis KBLI
            </label>
            <select
              id="jenis-kbli"
              name="jenis-kbli"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-[#2E2E2E] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
            <option value="all">Semua Lapangan Usaha</option>
              <option value="A">A. Pertanian, Kehutanan, dan Perikanan</option>
              <option value="B">B. Pertambangan dan Penggalian</option>
              <option value="C">C. Industri Pengolahan</option>
              <option value="D">D. Pengadaan Listrik dan Gas</option>
              <option value="E">E. Pengadaan Air; Pengelolaan Sampah, Limbah, dan Daur Ulang</option>
              <option value="F">F. Konstruksi</option>
              <option value="G">G. Perdagangan Besar dan Eceran; Reparasi Mobil dan Sepeda Motor</option>
              <option value="H">H. Transportasi dan Pergudangan</option>
              <option value="I">I. Penyediaan Akomodasi dan Makan Minum</option>
              <option value="J">J. Informasi dan Komunikasi</option>
              <option value="K">K. Jasa Keuangan dan Asuransi</option>
              <option value="L">L. Real Estat</option>
              <option value="M">M, N. Jasa Perusahaan</option>
              <option value="O">O. Administrasi Pemerintahan, Pertahanan, dan Jaminan Sosial Wajib</option>
              <option value="P">P. Jasa Pendidikan</option>
              <option value="Q">Q. Jasa Kesehatan dan Kegiatan Sosial</option>
              <option value="R">R,S, T, U. Jasa Lainnya</option>
            </select>

            <label className="block text-sm font-medium text-white mt-4">
              RT
            </label>
            <select 
              id="rt"
              name="rt"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-[#2E2E2E] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              value={selectedRT}
              onChange={(e) => setSelectedRT(e.target.value)}>
              <option value="desa">Semua RT</option>
              {data.map((item, index) => (
                <option key={index} value={item.features[0].properties.rt}>
                  {item.features[0].properties.rt}
                </option>
              ))}
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
    {/* Check if data and necessary properties are defined */}
    {filteredData && filteredData.features && filteredData.features[0] ? (
        <>
        {selectedRT !== 'desa' ? (
          <>
          <div className="mb-4">
            <p className="bg-[#2E2E2E] rounded-full p-1 text-sm font-medium">
              <span className="text-sm material-icons mr-1">location_on</span> RT {filteredData.features[0].properties.rt} RW {filteredData.features[0].properties.rw} Dsn {filteredData.features[0].properties.dusun}
            </p>
          </div>
          <div className="bg-[#101920] p-4 rounded-md mb-4 text-left">
            <div className="text-4xl font-bold">
              <CountUp start={0} end={filteredData.features[0].properties.jml_umkm} duration={3} />
            </div>
            <p className="text-xm">Pelaku Usaha Mikro</p>
          </div>
          <div className="bg-[#101920] p-4 rounded-md mb-4 text-left">
            <div className="text-4xl font-bold">
              <CountUp start={0} end={((filteredData.features[0].properties.jml_umkm / filteredData.features[0].properties.jml_ruta) * 100).toFixed(2)} duration={3} decimals={2} />%
            </div>
            <p className="text-xm">Rumah Tangga UMKM</p>
          </div>
          <div className="bg-[#101920] p-4 rounded-md mb-4 text-left">
            <div className="text-2xl font-bold">
              Rp<CountUp start={0} end={filteredData.features[0].properties.jml_umkm*1000000} duration={3} />
            </div>
            <p className="text-xm">Pendapatan UMKM</p>
          </div>
          </>
        ) : (
            <>
          <div className="mb-4">
            <p className="bg-[#2E2E2E] rounded-full p-1 text-sm font-medium">
              <span className="text-sm material-icons mr-1">location_on</span> Desa Simoanginangin
              </p>
          </div>
          <div className="bg-[#101920] p-4 rounded-md mb-4 text-left">
            <div className="text-4xl font-bold">
              <CountUp start={0} end={dataAgregat.jml_umkm} duration={3} />
            </div>
            <p className="text-xm">Pelaku Usaha Mikro</p>
          </div>
          <div className="bg-[#101920] p-4 rounded-md mb-4 text-left">
            <div className="text-4xl font-bold">
              <CountUp start={0} end={((dataAgregat.jml_umkm / dataAgregat.jml_ruta) * 100).toFixed(2)} duration={3} decimals={2} />%
            </div>
            <p className="text-xm">Rumah Tangga UMKM</p>
          </div>
          <div className="bg-[#101920] p-4 rounded-md mb-4 text-left">
            <div className="text-2xl font-bold">
              Rp<CountUp start={0} end={dataAgregat.jml_umkm*1000000} duration={3} />
            </div>
            <p className="text-xm">Pendapatan UMKM</p>
          </div>
            </>
        )}
          <div>
            <p className="mb-2 text-left font-xl font-semibold">Sebaran Lapangan Usaha UMKM</p>
            <ExpandableList />
          </div>
          <div className="p-4 rounded-md mb-4">
            <DonutChart data={chartData} />
          </div>
        </>
      ) : (
        <p>Data tidak tersedia</p>
      )}
  </div>
</Transition>


        <Legenda />
      </div>
    </div>
  );
}
