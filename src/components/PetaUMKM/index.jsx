import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  LayersControl,
  Marker,
  Popup,
} from "react-leaflet";
import * as turf from "@turf/turf";
import "leaflet/dist/leaflet.css";
import L, { divIcon } from "leaflet";
import { Transition } from "@headlessui/react";
import { DonutChart } from "./Doughnut.jsx";
import api from "../../utils/api.js";
import { message } from "antd";
import CountUp from "react-countup";
import { BeatLoader } from "react-spinners";

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
            <td className="ml-2 mr-0 text-sm text-left w-100">
              Pertanian, Kehutanan, Perikanan
            </td>
          </tr>
          <tr className="flex items-center mb-2 bg-[#101920] rounded-xl">
            <td className="flex items-center justify-center font-bold w-8 h-8 bg-[#014A77] text-white rounded-xl p-2">
              55
            </td>
            <td className="ml-2 text-sm text-left">
              Pertambangan dan Penggalian
            </td>
          </tr>
          <tr className="flex items-center mb-2 bg-[#101920] rounded-xl">
            <td className="flex items-center justify-center font-bold w-8 h-8 bg-[#27273D] text-white rounded-xl p-2">
              55
            </td>
            <td className="ml-2 text-sm text-left">Industri Pengolahan</td>
          </tr>
          <tr className="flex items-center mb-2 bg-[#101920] rounded-xl">
            <td className="flex items-center justify-center font-bold w-8 h-8 bg-[#6B2836] text-white rounded-xl p-2">
              55
            </td>
            <td className="ml-2 text-sm text-left">
              Pengadaan Listrik dan Gas
            </td>
          </tr>
          <tr className="flex items-center mb-2 bg-[#101920] rounded-xl">
            <td className="flex items-center justify-center font-bold w-8 h-8 bg-[#AF282F] text-white rounded-xl p-2">
              55
            </td>
            <td className="ml-2 text-sm text-left">
              Pertanian, Kehutanan, Perikanan
            </td>
          </tr>
          {expanded && (
            <>
              <tr className="flex items-center mb-2 bg-[#101920] rounded-xl">
                <td className="flex items-center justify-center w-8 h-8 p-2 font-bold text-white bg-blue-600 rounded-xl">
                  55
                </td>
                <td className="ml-2 text-sm text-left">
                  Pertanian, Kehutanan, Perikanan
                </td>
              </tr>
              <tr className="flex items-center mb-2 bg-[#101920] rounded-xl">
                <td className="flex items-center justify-center w-8 h-8 p-2 font-bold text-white bg-blue-600 rounded-xl">
                  55
                </td>
                <td className="ml-2 text-sm text-left">
                  Pertanian, Kehutanan, Perikanan
                </td>
              </tr>
              {/* Add more items as needed */}
            </>
          )}
        </tbody>
      </table>
      <button
        onClick={handleToggle}
        className="mt-4 text-sm text-right text-gray-400 items-right"
      >
        {expanded ? "Kembali" : "Selengkapnya..."}
      </button>
    </div>
  );
};

export default function MapSection() {
  const [selectedClassification, setSelectedClassification] = useState("all");
  const [mapInstance, setMapInstance] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isVisualizationOpen, setIsVisualizationOpen] = useState(true);
  const [data, setData] = useState([]);
  const [dataAgregat, setDataAgregat] = useState([]);
  const [dataRumahTangga, setDataRumahTangga] = useState([]);
  const [selectedRT, setSelectedRT] = useState("desa");
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(
    data ? (data.length > 0 ? data[0] : {}) : {}
  );
  const [chartData, setChartData] = useState([]);
  const [showRT, setShowRT] = useState(true);
  const [showIndividu, setIndividu] = useState(true);
  const [visualization, setVisualization] = useState("umkm");
  const toggleRT = () => setShowRT(!showRT);
  const changeVisualization = (type) => setVisualization(type);

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
      const response = await api.get("/api/rumahTangga");
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
    // Fetch data from API
    fetchData();
    fetchDataAgregat();
    fetchDataRumahTangga();
  }, []);

  // Function to determine style based on feature properties
  const getStyle = (data) => {
    const density = data.features[0].properties.jml_umkm || 0;
    return {
      fillColor: getColor(density),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };

  const getColor = (density) => {
    return density > 100
      ? "#800026"
      : density > 50
      ? "#BD0026"
      : density > 20
      ? "#E31A1C"
      : density > 10
      ? "#FC4E2A"
      : density > 5
      ? "#FD8D3C"
      : density > 2
      ? "#FEB24C"
      : density > 0
      ? "#FED976"
      : "#000000";
  };

  const getStyleIncome = (data) => {
    const densityIncome =
      data.features[0].properties.total_pendapatan_sebulan_terakhir || 0;
    return {
      fillColor: getColorIncome(densityIncome),
      weight: 2,
      opacity: 1,
      color: "white",
      dashArray: "3",
      fillOpacity: 0.7,
    };
  };

  const getColorIncome = (densityIncome) => {
    return densityIncome > 100000000
      ? "#08306B" // Dark blue
      : densityIncome > 75000000
      ? "#08519C"
      : densityIncome > 50000000
      ? "#2171B5"
      : densityIncome > 20000000
      ? "#4292C6"
      : densityIncome > 1000000
      ? "#6BAED6"
      : densityIncome > 500000
      ? "#9ECAE1"
      : densityIncome > 0
      ? "#C6DBEF"
      : "#000000"; // Light blue
  };

  let selectedLayer = null; // Track the currently selected layer

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        if (layer !== selectedLayer) {
          layer.setStyle({
            weight: 4,
            color: "#333",
            dashArray: "",
            fillOpacity: 0.85,
          });
        }

        const keysLayer = [
          "RT",
          "RW",
          "Dusun",
          "Jumlah Rumah Tangga",
          "Jumlah UMKM",
          "UMKM Tetap",
          "UMKM Non-Tetap",
        ];
        const keysToShow = [
          "rt",
          "rw",
          "dusun",
          "jml_ruta",
          "jml_umkm",
          "jml_umkm_tetap",
          "jml_umkm_nontetap",
        ];

        const popupContent = `<div>
          <strong>Informasi:</strong><br>
          ${keysToShow
            .map(
              (key, index) =>
                `${keysLayer[index]}: ${feature.properties[key] || "N/A"}`
            )
            .join("<br>")}
        </div>`;

        layer.bindPopup(popupContent).openPopup();
      },

      mouseout: (e) => {
        const layer = e.target;
        if (layer !== selectedLayer) {
          layer.setStyle({
            weight: 2,
            color: "white",
            dashArray: "3",
            fillOpacity: 0.6,
          });
        }
        layer.closePopup();
      },

      click: (e) => {
        const layer = e.target;
        if (selectedLayer) {
          selectedLayer.setStyle({
            weight: 4,
            color: "#333",
            dashArray: "",
            fillOpacity: 0.85,
          });
        }
        if (selectedLayer === layer) {
          selectedLayer = null;
          setSelectedRT("desa");
        } else {
          selectedLayer = layer;
          setSelectedRT(feature.properties.rt);
          layer.setStyle({
            weight: 4,
            color: "#333",
            dashArray: "",
            fillOpacity: 0.95,
          });
        }
      },
    });
  };

  useEffect(() => {
    if (selectedRT === "desa") {
      setFilteredData(data[0]);
    } else {
      const filtered = data.find(
        (item) => item.features[0].properties.rt === selectedRT
      );
      setFilteredData(filtered || data[0]); // Fallback to data[0] if no match is found
    }
  }, [selectedRT, data]);

  useEffect(() => {
    if (filteredData) {
      const chartData = {
        name: filteredData
          ? filteredData.features
            ? filteredData.features.length > 0
              ? filteredData.features[0].properties.rt
              : ""
            : ""
          : "",
        value: filteredData
          ? filteredData.features
            ? filteredData.features.length > 0
              ? filteredData.features[0].properties.jml_umkm
              : 0
            : 0
          : 0,
        // value: filteredData.features[0].properties.jml_umkm,
      };
      setChartData([chartData]);
    }
  }, [filteredData]);

  function capitalizeWords(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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
  const classifications = {
    all: "Seluruh Lapangan Usaha",
    // kbli_a: "A. Pertanian, Kehutanan, dan Perikanan",
    kbli_b: "B. Pertambangan dan Penggalian",
    kbli_c: "C. Industri Pengolahan",
    kbli_d: "D. Pengadaan Listrik dan Gas",
    kbli_e: "E. Pengadaan Air; Pengelolaan Sampah, Limbah, dan Daur Ulang",
    kbli_f: "F. Konstruksi",
    kbli_g: "G. Perdagangan Besar dan Eceran; Reparasi Mobil dan Sepeda Motor",
    kbli_h: "H. Transportasi dan Pergudangan",
    kbli_i: "I. Penyediaan Akomodasi dan Makan Minum",
    kbli_j: "J. Informasi dan Komunikasi",
    kbli_k: "K. Jasa Keuangan dan Asuransi",
    kbli_l: "L. Real Estat",
    kbli_m: "M, N. Jasa Perusahaan",
    // kbli_n: "M, N. Jasa Perusahaan",
    // kbli_o: "O. Administrasi Pemerintahan, Pertahanan, dan Jaminan Sosial Wajib",
    kbli_p: "P. Jasa Pendidikan",
    kbli_q: "Q. Jasa Kesehatan dan Kegiatan Sosial",
    kbli_r: "R, S, dan Jasa Lainnya",
    // kbli_s: "R,S, T, U. Jasa Lainnya",
    // kbli_t: "R,S, T, U. Jasa Lainnya",
    // kbli_u: "R,S, T, U. Jasa Lainnya"
  };

  const handleClassificationChange = (event) => {
    setSelectedClassification(event.target.value);
  };

  return (
    <div className="relative w-full h-[89vh] font-sfProDisplay">
      <div className="absolute top-0 left-0 z-0 w-full h-full">
        {data ? (
          data.length > 0 && (
            <MapContainer
              center={[-7.4388978, 112.59942]} // lokasi desa simoanginangin
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
                          selectedClassification === "all" ||
                          item.klasifikasiKbli === selectedClassification
                      )
                      .map((item) => (
                        <Marker
                          key={`marker-${item._id}`}
                          position={[
                            parseFloat(item.latitude),
                            parseFloat(item.longitude),
                          ]}
                          icon={divIcon({
                            className: "custom-label",
                            html: `<div style="
                          border-radius: 50%;
                          width: 24px;
                          height: 24px;
                          display: flex;
                          justify-content: center;
                          align-items: center;
                        ">
                          <span class="material-icons" style="color:#AF282F; font-size=2rem"> location_on </span>
                        </div>`,
                          })}
                        >
                          <Popup>
                            <div>
                              <strong>Informasi UMKM:</strong>
                              <br />
                              RT: {item.rt}
                              <br />
                              RW: {item.rw}
                              <br />
                              Dusun: {item.dusun}
                              <br />
                              Klasifikasi:{" "}
                              {classifications[item.klasifikasiKbli]}
                              <br />
                              Jenis UMKM: {capitalizeWords(item.jenisUmkm)}
                              <br />
                              Pendapatan per Bulan: Rp
                              {item.pendapatanSebulanTerakhir}
                              <br />
                            </div>
                          </Popup>
                        </Marker>
                      ))}
                </>
              ))}
            </MapContainer>
          )
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <BeatLoader />
          </div>
        )}
      </div>

      <div className="mx-[10%] font-sfProDisplay">
        <button
          className="absolute top-4 right-[10%] z-10 px-11 py-2 bg-[#AF282F] text-white rounded-xl shadow-md flex items-center"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <span className="mr-2 material-icons">filter_list</span>
          Filter
        </button>

        <button
          className="absolute top-4 left-[10%] z-10 px-12 py-2 bg-[#AF282F] text-white rounded-xl shadow-md flex items-center"
          onClick={() => setIsVisualizationOpen(!isVisualizationOpen)}
        >
          <span className="mr-2 material-icons">analytics</span>
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
                      const { rt } = item.features[0].properties; // Destrukturisasi untuk bersih
                      return (
                        <option key={rt} value={rt}>
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
              Jenis Kategori
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
              Tempat Usaha
            </label>
            <select
              id="tUsaha"
              name="tUsaha"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-[#2E2E2E] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="all_tUsaha">Semua Tempat Usaha</option>
              <option value="bangunan_khusus_usaha">
                Bangunan Khusus Usaha
              </option>
              <option value="bangunan_campuran">Bangunan Campuran</option>
              <option value="kaki_lima">Kaki Lima</option>
              <option value="keliling">Keliling</option>
              <option value="online">
                Didalam bangunan tempat tinggal/Online
              </option>
            </select>

            <label className="block mt-4 text-sm font-medium text-white">
              Status UMKM
            </label>
            <select
              id="status"
              name="status"
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 bg-[#2E2E2E] text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              <option value="bangunan_khusus_usaha">Semua UMKM</option>
              <option value="bangunan_campuran">Mikro</option>
              <option value="kaki_lima">Kecil</option>
              <option value="keliling">Menengah</option>
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
            {filteredData &&
            filteredData.features &&
            filteredData.features[0] ? (
              <>
                {selectedRT !== "desa" ? (
                  <>
                    <div className="mb-4">
                      <p className="bg-[#2E2E2E] rounded-full p-1 text-sm font-medium">
                        <span className="mr-1 text-sm material-icons">
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
                          end={filteredData.features[0].properties.jml_umkm}
                          duration={3}
                        />
                      </div>
                      <p className="text-xm">Pelaku UMKM</p>
                    </div>
                    <div className="bg-[#101920] p-4 rounded-md mb-4 text-left">
                      <div className="text-4xl font-bold">
                        <CountUp
                          start={0}
                          end={(
                            (filteredData.features[0].properties.jml_umkm /
                              filteredData.features[0].properties.jml_ruta) *
                            100
                          ).toFixed(2)}
                          duration={3}
                          decimals={2}
                        />
                        %
                      </div>
                      <p className="text-xm">Keluarga UMKM</p>
                    </div>
                    {/* <div className="bg-[#101920] p-4 rounded-md mb-4 text-left">
            <div className="text-2xl font-bold">
              Rp<CountUp start={0} end={filteredData.features[0].properties.total_pendapatan_sebulan_terakhir} duration={3/2} />
            </div>
            <p className="text-xm">Pendapatan UMKM</p>
          </div> */}
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <p className="bg-[#2E2E2E] rounded-full p-1 text-sm font-medium">
                        <span className="mr-1 text-sm material-icons">
                          location_on
                        </span>{" "}
                        Desa Simoangin Angin
                      </p>
                    </div>
                    <div className="bg-[#101920] p-4 rounded-md mb-4 text-left">
                      <div className="text-4xl font-bold">
                        <CountUp
                          start={0}
                          end={dataAgregat.jml_umkm}
                          duration={3}
                        />
                      </div>
                      <p className="text-xm">Pelaku UMKM</p>
                    </div>
                    <div className="bg-[#101920] p-4 rounded-md mb-4 text-left">
                      <div className="text-4xl font-bold">
                        <CountUp
                          start={0}
                          end={(
                            (dataAgregat.jml_umkm / dataAgregat.jml_ruta) *
                            100
                          ).toFixed(2)}
                          duration={3}
                          decimals={2}
                        />
                        %
                      </div>
                      <p className="text-xm">Rumah Tangga UMKM</p>
                    </div>
                    {/* <div className="bg-[#101920] p-4 rounded-md mb-4 text-left">
            <div className="text-2xl font-bold">
              Rp<CountUp start={0} end={dataAgregat.total_pendapatan_sebulan_terakhir} duration={3/2} />
            </div>
            <p className="text-xm">Pendapatan UMKM</p>
          </div> */}
                  </>
                )}
                {/* <div>
            <p className="mb-2 font-semibold text-left font-xl">Sebaran Lapangan Usaha UMKM</p>
            <ExpandableList />
          </div> */}
                {/* <div className="p-4 mb-4 rounded-md">
            <DonutChart data={chartData} />
          </div> */}
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
                showRT ? "bg-[#BD0026] text-white" : "bg-gray-200 text-gray-800"
              }`}
              onClick={toggleRT}
            >
              {showRT ? (
                <div className="flex items-center">
                  <span className="mr-2 text-xl material-icons">
                    visibility_off
                  </span>{" "}
                  RT
                </div>
              ) : (
                <div className="flex items-center">
                  <span className="mr-2 text-xl material-icons">
                    visibility
                  </span>{" "}
                  RT
                </div>
              )}
            </button>
            {/* <div className="flex flex-col justify-center mr-4 space-y-2">
        
        <button
          className={`py-1 px-2 rounded-md text-sm ${visualization === 'umkm' ? 'bg-[#BD0026] text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => changeVisualization('umkm')}
        >
          Peta UMKM
        </button>
        <button
          className={`py-1 px-2 rounded-md text-sm ${visualization === 'pendapatan' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
          onClick={() => changeVisualization('pendapatan')}
        >
          Peta Pendapatan
        </button>
        </div> */}
            <div>
              {visualization === "umkm" ? (
                <div className="w-[20vh]">
                  <div className="mb-1 text-sm font-semibold text-right">
                    Jumlah UMKM
                  </div>
                  <div className="relative h-6 mb-2 rounded-full">
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to right, #FED976,#FEB24C, #FD8D3C, #FC4E2A, #E31A1C,#BD0026, #800026)",
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
