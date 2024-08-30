import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, LayersControl, Marker, Popup} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { divIcon } from "leaflet";
import { Transition } from "@headlessui/react";
import api2 from "../../utils/api2.js";
import { message } from "antd";
import CountUp from "react-countup";
import { PiOrangeDuotone } from "react-icons/pi";
import { renderToString } from 'react-dom/server';
import { BeatLoader } from "react-spinners";

export default function MapSection() {
  const [selectedClassification, setSelectedClassification] = useState("all");
  const [selectedtUsaha, setSelectedtUsaha] = useState("all");
  const [mapInstance, setMapInstance] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isVisualizationOpen, setIsVisualizationOpen] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const [data, setData] = useState([]);
  const [dataAgregat, setDataAgregat] = useState([]);
  const [dataRumahTangga, setDataRumahTangga] = useState([]);
  const [selectedRT, setSelectedRT] = useState("desa");
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(
    data ? (data.length > 0 ? data[0] : {}) : {}
  );
  const [showRT, setShowRT] = useState(true);
  const [showIndividu, setIndividu] = useState(true);
  const [visualization, setVisualization] = useState("umkm");
  const toggleRT = () => setShowRT(!showRT);
  const changeVisualization = (type) => setVisualization(type);
  const iconHtml = renderToString(<PiOrangeDuotone />);

  const fetchData = async () => {
    setLoading(true); // Mulai loading
    try {
      const response = await api2.get("/api/sls/all/geojson");
      setData(response.data.data); // Update state dengan data dari API
      console.log("Data fetched:", response.data.data);
    } catch (error) {
      // Cek jika error memiliki respons body
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(`Terjadi kesalahan: ${error.response.data.message}`, 5);
      } else {
        // Jika error tidak memiliki respons body yang dapat diakses
        message.error(`Terjadi kesalahan: ${error.message}`, 5);
      }
    } finally {
      setLoading(false); // Akhiri loading
    }
  };

  const fetchDataAgregat = async () => {
    setLoading(true); // Mulai loading
    try {
      const response = await api2.get("/api/sls/all/aggregate");
      setDataAgregat(response.data.data); // Update state dengan data dari API
      console.log("Data fetched:", response.data.data);
    } catch (error) {
      // Cek jika error memiliki respons body
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(`Terjadi kesalahan: ${error.response.data.message}`, 5);
      } else {
        // Jika error tidak memiliki respons body yang dapat diakses
        message.error(`Terjadi kesalahan: ${error.message}`, 5);
      }
    } finally {
      setLoading(false); // Akhiri loading
    }
  };

  const fetchDataRumahTangga = async () => {
    setLoading(true); // Mulai loading
    try {
      const response = await api2.get("/api/usahaKlengkeng");
      setDataRumahTangga(response.data.data); // Update state dengan data dari API
      console.log("Data fetched:", response.data.data);
    } catch (error) {
      // Cek jika error memiliki respons body
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(`Terjadi kesalahan: ${error.response.data.message}`, 5);
      } else {
        // Jika error tidak memiliki respons body yang dapat diakses
        message.error(`Terjadi kesalahan: ${error.message}`, 5);
      }
    } finally {
      setLoading(false); // Akhiri loading
    }
  };

  useEffect(() => {
    if (!isFetched) {
      fetchData().then(() => {
        fetchDataAgregat().then(() => {
          fetchDataRumahTangga().then(() => {
            setIsFetched(true); // Set isFetched to true after all data is fetched
          });
        });
      });
    }
  }, [isFetched]);

  // Function to determine style based on feature properties
  const getStyle = (data) => {
    const density = data.features[0].properties.jml_unit_usaha_klengkeng || 0;
    return {
      fillColor: getColor(density),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.3,
    };
  };

  const getColor = (density) => {
    return density > 50
      ? "#7E370C"
      : density > 20
      ? "#B05E27"
      : density > 10
      ? "#D4AC2B"
      : density > 5
      ? "#FFCE45"
      : density > 2
      ? "#FEB24C"
      : density > 0
      ? "#FED976"
      : "#000000";
  };

  let selectedLayer = null; // Track the currently selected layer

  const onEachFeature = (feature, layer) => {
  layer.on({
    mouseover: (e) => {
      const layer = e.target;
      if (layer !== selectedLayer) {
        layer.setStyle({
          weight: 4,
          color: "#fff",
          dashArray: "",
          fillOpacity: 0.8,
        });
      }

      const keysLayer = [
        "RT",
        "RW",
        "Dusun",
        "Jumlah Usaha",
      ];
      const keysToShow = [
        "rt",
        "rw",
        "dusun",
        "jml_unit_usaha_klengkeng",
      ];

      const popupContent = `<div>
        <strong>Informasi RT:</strong><br>
        ${keysToShow
          .map(
            (key, index) =>
              `${keysLayer[index]}: ${feature.properties[key] || "N/A"}`
          )
          .join("<br>")}
      </div>`;

      const popup = layer.bindPopup(popupContent, {
        autoPan: false,
      }).openPopup(e.latlng);

      popup.setLatLng(e.latlng);
    },

    mouseout: (e) => {
      const layer = e.target;
      if (layer !== selectedLayer) {
        layer.setStyle({
          weight: 2,
          color: "white",
          dashArray: "3",
          fillOpacity: 0.3,
        });
      }
      layer.closePopup();
    },

    click: (e) => {
      const layer = e.target;
      
      // Reset previous selected layer style
      if (selectedLayer) {
        selectedLayer.setStyle({
          weight: 2,
          color: "white",
          dashArray: "3",
          fillOpacity: 0.3,
        });
      }
      
      // Set the current layer as the selected layer
      if (selectedLayer === layer) {
        selectedLayer = null;
        setSelectedRT("desa");
      } else {
        selectedLayer = layer;
        setSelectedRT(feature.properties.kode);
        layer.setStyle({
          weight: 4,
          color: "#fff",
          dashArray: "",
          fillOpacity: 0.8, // Ensure opacity is set to 0.8 when clicked
        });
      }
    },
  });
};

  useEffect(() => {
    if (data && data.length > 0) {
      // Periksa apakah data ada dan tidak kosong
      if (selectedRT === "desa") {
        setFilteredData(data[0]);
      } else {
        const filtered = data.find(
          (item) => item.features[0].properties.kode === selectedRT
        );
        setFilteredData(filtered || data[0]); // Fallback to data[0] if no match is found
      }
    } else {
      // Jika data tidak ada atau kosong, Anda bisa mengatur filteredData ke nilai default
      setFilteredData(null); // Atau data default lainnya jika diperlukan
    }
  }, [selectedRT, data]);

  function capitalizeWords(str) {
    return str
      .split(/[-/]/) // Pisahkan berdasarkan "-" dan "/"
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
      .replace(/\s\/\s/, "/"); // Gabungkan kembali "/" tanpa spasi
  }

  function calculateCentroid(multiPolygon) {
    let totalX = 0,
      totalY = 0,
      totalPoints = 0;

    multiPolygon.coordinates.forEach((polygon) => {
      polygon.forEach((ring) => {
        ring.forEach((coordinate) => {
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

  const tempatUsaha = {
    all: "Semua Produk",
    kopi_biji_klengkeng : "Kopi Biji Klengkeng",
    Kerajinan_tangan : "Kerajinan Tangan dari Daun (contoh: pigura, kipas)",
    batik_ecoprint : "Batik Ecoprint",
    minuman : "Minuman Klengkeng (contoh: Susu jelly, sirup)",
    makanan : "Makanan Kelengkeng (Selai, Strudel)",
  };

  const classifications = {
    all: "Semua Jenis",
    // kbli_a: "A. Pertanian, Kehutanan, dan Perikanan",
    new_crystal: "New Crystal",
    pingpong: "Pingpong",
    matalada: "Matalada",
    diamond_river: "Diamond River",
  };

  const handleClassificationChange = (event) => {
    setSelectedClassification(event.target.value);
  };

  const handletUsahaChange = (event) => {
    setSelectedtUsaha(event.target.value);
  };
  const LegendMenu = () => {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const toggleExpand2 = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <div className="relative">
        {/* Tombol Simbol Legenda */}
        <button
          onClick={toggleExpand2}
          className={`py-1 px-2 rounded-md focus:outline-none ${
            isExpanded ? "bg-[#D4AC2B] text-white" : "bg-gray-200 text-gray-800"
          }`}
          aria-label="Toggle Legend"
        >
          {/* Ikon untuk tombol */}
          <span className="material-icons">legend_toggle</span>
        </button>
  
        {/* Menu yang akan diperluas ketika tombol diklik */}
        {isExpanded && (
          <div
            className="absolute right-0 bottom-full mb-3 p-4 w-[20vh] bg-white rounded-md shadow-md text-gray-800"
            style={{
            backgroundColor: "rgba(255, 255, 255, 0.8)", // Semi-transparent background
            backdropFilter: "blur(12px)", // Blur effect
          }}
          >
            <div className="mb-1 text-sm font-semibold text-right">
              Jumlah Usaha
            </div>
            <div className="relative h-6 mb-2 rounded-full">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to right, #FFCE45,#D4AC2B, #B05E27, #7E370C)",
                  borderRadius: "99px",
                }}
              ></div>
            </div>
            <div className="flex justify-between px-2 mt-1">
              <span className="text-xs">0</span>
              <span className="text-xs">100+</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative w-full h-[89vh] font-sfProDisplay">
      <div className="absolute top-0 left-0 z-0 w-full h-full">
        <MapContainer
          center={[-7.446033620089397, 112.60262064240202]} // lokasi desa simoanginangin
          zoom={16}
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
          {data ? (
            data.length > 0 &&
            data.map((geoJsonData, index) => (
              <>
                <GeoJSON
                  key={index}
                  data={geoJsonData}
                  style={
                    visualization === "umkm"
                      ? getStyle(geoJsonData)
                      : getStyleIncome(geoJsonData)
                  }
                  onEachFeature={onEachFeature}
                />
                {showRT && (
                  <Marker
                    key={`marker-${geoJsonData.features[0].properties.kode}`}
                    position={calculateCentroid(
                      geoJsonData.features[0].geometry
                    )}
                    icon={divIcon({
                      className: "custom-label",
                      html: `<div class="w-[75px] text-white text-[0.8rem] font-bold absolute p-2"
                        style="
                          -webkit-text-stroke-width: 0.1px;
                          -webkit-text-stroke-color: black;
                          text-shadow: 1px 1px #000;
                        ">RT ${
                          geoJsonData.features[0].properties.rt || "No label"
                        }</div>`,
                    })}
                  />
                )}
                {showIndividu &&
                  dataRumahTangga
                  .filter(
                    (item) =>
                      (selectedRT === "desa" || item.kodeSls === selectedRT)&&
                      (selectedClassification === "all" || item.jenis_klengkeng === selectedClassification) &&
                      (selectedtUsaha === "all" || item.pemanfaatan_produk === selectedtUsaha)                   )
                    .map((item) => (
                      <Marker
                        key={`marker-${item._id}`}
                        position={[
                          parseFloat(item.latitude),
                          parseFloat(item.longitude),
                        ]}
                        icon={divIcon({
                        className: "custom-label",
                        html: `
                        <span
                          class="material-symbols-outlined"
                          style="
                            color: #BD7A33;
                            font-size: 1.5rem;
                            font-variation-settings:
                              'FILL' 1,
                              'wght' 400,
                              'GRAD' 0,
                              'opsz' 24;
                            -webkit-text-stroke: 0.6px rgba(255, 255, 255, 0.8); /* Menambahkan stroke putih */
                          "
                        >
                          nutrition
                        </span>

                        </div>`,
                      })}
                      >
                        <Popup>
                          <div className="z-100">
                            <strong>Informasi Usaha:</strong>
                            {console.log("Check items ", item)}
                            {/* <img src= alt="Kelengkeng Image" className="w-full h-auto mb-4" /> */}
                            <img src={item.url_img} alt="Kelengkeng Image" className="w-40 h-auto mb-4" />
                            <br /> <b>Jenis Kelengkeng </b><br/>
                            <span className="text-[1rem] font-bold p-0 mt-0 mb-0">{capitalizeWords(item.jenis_klengkeng)} </span>
                            <br />
                            {item.rt_rw_dusun} 
                            <br />
                            <b>Usia Pohon: </b><br />{item.usia_pohon} Tahun
                            <br />
                            <b>Pemanfaatan Produk: </b><br />{((item.pemanfaatan_produk))}
                            <br />
                            {/* <b>Skala Usaha: </b><br />{capitalizeWords(item.skala_usaha)} */}
                          </div>
                        </Popup>
                      </Marker>
                    ))}
              </>
            ))
          ) : (
            <BeatLoader />
          )}
        </MapContainer>
      </div>

      <div className="mx-[10%] font-sfProDisplay">
        <button
          className="absolute top-4 right-[10%] z-10 px-11 py-2 bg-[#D4AC2B] text-white rounded-xl shadow-md flex items-center"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <span className="mr-2 material-icons">filter_list</span>
          Filter
        </button>

        <button
          className="absolute top-4 left-[10%] z-10 px-12 py-2 bg-[#D4AC2B] text-white rounded-xl shadow-md flex items-center"
          onClick={() => setIsVisualizationOpen(!isVisualizationOpen)}
        >
          <span className="mr-2 material-icons">analytics</span>
          Statistik
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
            <div className="grid grid-cols-2 gap-4">
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
              </div>
              <div>
                <label className="block text-sm font-medium text-white">
                  RT
                </label>
                <select
                  id="rt"
                  name="rt"
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-[#2E2E2E] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                  value={selectedRT}
                  onChange={(e) => setSelectedRT(e.target.value)}
                >
                  <option value="desa">Semua RT</option>
                  {data && data.length > 0 ? (
                    data.map((item) => {
                      const { rt, kode } = item.features[0].properties; // Destrukturisasi untuk bersih
                      return (
                        <option key={rt} value={kode}>
                          {rt}
                        </option>
                      );
                    })
                  ) : (
                    <option value="" disabled>
                      No RT available
                    </option>
                  )}
                </select>
              </div>
            </div>

            <label className="block mt-4 text-sm font-medium text-white">
              Jenis Klengkeng
            </label>
            <select
              id="jenis-kbli"
              name="jenis-kbli"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-[#2E2E2E] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              onChange={handleClassificationChange}
              value={selectedClassification}
            >
              {Object.entries(classifications).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
                </option>
              ))}
            </select>

            <label className="block mt-4 text-sm font-medium text-white">
              Pemanfaatan Produk
            </label>
            <select
              id="tUsaha"
              name="tUsaha"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-[#2E2E2E] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              onChange={handletUsahaChange}
              value={selectedtUsaha}
            >
              {Object.entries(tempatUsaha).map(([key, value]) => (
                <option key={key} value={key}>
                  {value}
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
            {filteredData &&
            filteredData.features &&
            filteredData.features[0] ? (
              <>
                {selectedRT !== "desa" ? (
                  <>
                    <div className="mb-4">
                      <p className="bg-[#2E2E2E] rounded-full p-1 text-sm text-[#fff] font-medium">
                        <span className="mr-1 text-sm material-icons text-[#fff] ">
                          location_on
                        </span>{" "}
                        RT {filteredData.features[0].properties.rt} RW{" "}
                        {filteredData.features[0].properties.rw} Dsn{" "}
                        {filteredData.features[0].properties.dusun}
                      </p>
                    </div>
                    <div className="bg-[#101920] p-4 rounded-md mb-4 text-left">
                      <div className="text-4xl font-bold">
                        <CountUp
                          start={0}
                          end={filteredData.features[0].properties.jml_unit_usaha_klengkeng}
                          duration={3}
                        />
                      </div>
                      <p className="text-xm">Pelaku Usaha</p>
                    </div>
                    <div className="bg-[#101920] p-4 rounded-md mb-4 text-left">
                      <div className="text-4xl font-bold">
                        <CountUp
                          start={0}
                          end={filteredData.features[0].properties.jml_pohon}
                          duration={3}
                        />
                      </div>
                      <p className="text-xm">Pohon Kelengkeng</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <p className="bg-[#2E2E2E] rounded-full text-[#fff] p-1 text-sm font-medium">
                        <span className="mr-1 text-sm material-icons">
                          location_on
                        </span>{" "}
                        Desa Simoketawang
                      </p>
                    </div>
                    <div className="bg-[#101920] p-4 rounded-md mb-4 text-left">
                      <div className="text-4xl font-bold">
                        <CountUp
                          start={0}
                          end={dataAgregat.jml_unit_usaha_klengkeng}
                          duration={3}
                        />
                      </div>
                      <p className="text-xm">Pelaku Usaha</p>
                    </div>
                    <div className="bg-[#101920] p-4 rounded-md mb-4 text-left">
                      <div className="text-4xl font-bold">
                        <CountUp
                          start={0}
                          end={dataAgregat.jml_pohon}
                          duration={3}
                        />
                      </div>
                      <p className="text-xm">Pohon Kelengkeng</p>
                    </div>
                  </>
                )}
              </>
            ) : (
              <p>Data tidak tersedia</p>
            )}
          </div>
        </Transition>
        <div
          className="absolute bottom-4 right-4 z-10 w-auto p-2 mr-[8%] bg-white rounded-md shadow-md text-gray-800"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)", // Semi-transparent background
            backdropFilter: "blur(12px)", // Blur effect
          }}
        >
          <div className="flex items-center justify-center">
            <button
              className={`py-1 px-2 rounded-md justify-center items-center text-center text-sm mr-4 ${
                showRT ? "bg-[#7E370C] text-white" : "bg-gray-200 text-gray-800"
              }`}
              onClick={toggleRT}
            >
              {showRT ? (
                <div className="flex items-center">
                  <span className="mr-2 text-xl material-icons">
                    visibility
                  </span>{" "}
                  RT
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="mr-2 text-xl material-icons">
                  visibility_off
                  </span>{" "}
                  RT
                </div>
              )}
            </button>
            <LegendMenu />
            {/* <div>
              {visualization === "umkm" ? (
                <div className="w-[20vh]">
                  <div className="mb-1 text-sm font-semibold text-right">
                    Jumlah Usaha
                  </div>
                  <div className="relative h-6 mb-2 rounded-full">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to right, #FFCE45,#D4AC2B, #B05E27, #7E370C)",
                        borderRadius: "99px",
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between px-2 mt-1">
                    <span className="text-xs">0</span>
                    <span className="text-xs">100+</span>
                  </div>
                </div>
              ) : (
                <div className="w-[20vh]">
                  <div className="mb-1 text-sm font-semibold text-right">
                    Jumlah Pendapatan
                  </div>
                  <div className="relative h-6 mb-2 rounded-full">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to right, #C6DBEF,#9ECAE1, #6BAED6, #4292C6, #2171B5,#08519C, #08306B)",
                        borderRadius: "99px",
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between px-2 mt-1">
                    <span className="text-xs">0</span>
                    <span className="text-xs">100 Juta+</span>
                  </div>
                </div>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
