import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import api from "../../utils/api";
import "leaflet/dist/leaflet.css";
import { message } from "antd";
import { Bars } from "react-loader-spinner";

// Component to update map position
const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(position, map.getZoom()); // Update map center and keep the zoom level
  }, [position, map]);

  return null;
};

// Helper function to validate latitude and longitude
const isValidLatitude = (latitude) => {
  return !isNaN(latitude) && latitude >= -90 && latitude <= 90;
};

const isValidLongitude = (longitude) => {
  return !isNaN(longitude) && longitude >= -180 && longitude <= 180;
};

const isValidPendapatanSebulanTerakhir = (pendapatanSebulanTerakhir) => {
  return pendapatanSebulanTerakhir >= 0;
};

const AddRutaModal = ({
  isOpen,
  onClose,
  fetchData,
  fetchDataAggregate,
  daftarRt,
  daftarRw,
  daftarDusun,
  daftarKlasifikasi,
  daftarJenisUmkm,
}) => {
  const [addRutaData, setAddRutaData] = useState({});
  const [loading, setLoading] = useState(false);
  const [mapPosition, setMapPosition] = useState([-7.437249, 112.601518]); // Default position
  const [selectedRt, setSelectedRt] = useState("");
  const [selectedRw, setSelectedRw] = useState("");
  const [selectedDusun, setSelectedDusun] = useState("");
  const [selectedKlasifikasi, setSelectedKlasifikasi] = useState("");
  const [selectedJenisUmkm, setSelectedJenisUmkm] = useState("");
  const [latitudeError, setLatitudeError] = useState("");
  const [longitudeError, setLongitudeError] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (addRutaData.latitude && addRutaData.longitude) {
      const latitude = parseFloat(addRutaData.latitude);
      const longitude = parseFloat(addRutaData.longitude);

      if (errors.latitude === "" && errors.longitude === "") {
        setMapPosition([latitude, longitude]);
      }
    }
  }, [addRutaData.latitude, addRutaData.longitude]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddRutaData((prevValues) => ({ ...prevValues, [name]: value }));

    if (name === "namaKrt") {
      if (!value) {
        errors.namaKrt = "Nama harus diisi.";
      } else {
        errors.namaKrt = "";
      }
    }

    if (name === "pendapatanSebulanTerakhir") {
      const pendapatanSebulanTerakhir = parseFloat(value);
      if (value === "") {
        errors.pendapatanSebulanTerakhir =
          "Pendapatan sebulan terakhir harus diisi.";
      } else if (isNaN(value)) {
        errors.pendapatanSebulanTerakhir =
          "Pendapatan sebulan terakhir harus berupa angka.";
      } else if (!isValidPendapatanSebulanTerakhir(pendapatanSebulanTerakhir)) {
        errors.pendapatanSebulanTerakhir =
          "Pendapatan sebulan terakhir harus lebih dari 0.";
      } else {
        errors.pendapatanSebulanTerakhir = "";
      }
    }

    if (name === "latitude") {
      if (value === "") {
        errors.latitude = "Latitude harus diisi.";
      }
      else if (isNaN(value)) {
        errors.latitude = "Latitude harus berupa angka.";
      } else if (!isValidLatitude(parseFloat(value))) {
        errors.latitude = "Latitude harus antara -90 and 90.";
      } else {
        errors.latitude = "";
      }
    }

    if (name === "longitude") {
      if (value === "") {
        errors.longitude = "Longitude harus diisi.";
      }
      else if (isNaN(value)) {
        errors.longitude = "Longitude harus berupa angka.";
      } else if (!isValidLongitude(parseFloat(value))) {
        errors.longitude = "Longitude harus antara -180 and 180.";
      } else {
        errors.longitude = "";
      }
    }

    // setErrors(newErrors);

    // if (name === "latitude") {
    //   const latitude = parseFloat(value);
    //   if (!isValidLatitude(latitude)) {
    //     setLatitudeError("Latitude harus antara -90 and 90.");
    //   } else {
    //     setLatitudeError("");
    //   }
    // }

    // if (name === "longitude") {
    //   const longitude = parseFloat(value);
    //   if (!isValidLongitude(longitude)) {
    //     setLongitudeError("Longitude harus antara -180 and 180.");
    //   } else {
    //     setLongitudeError("");
    //   }
    // }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setAddRutaData((prevValues) => ({ ...prevValues, [name]: value }));

    if (name === "kodeRt") setSelectedRt(value);
    if (name === "rw") setSelectedRw(value);
    if (name === "dusun") setSelectedDusun(value);
    if (name === "klasifikasiKbli") setSelectedKlasifikasi(value);
    if (name === "jenisUmkm") setSelectedJenisUmkm(value);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validasi setiap field
    if (!addRutaData.namaKrt) newErrors.namaKrt = "Nama KRT wajib diisi.";
    if (!addRutaData.kodeRt) newErrors.kodeRt = "RT wajib dipilih.";
    if (!addRutaData.rw) newErrors.rw = "RW wajib dipilih.";
    if (!addRutaData.dusun) newErrors.dusun = "Dusun wajib dipilih.";
    if (!addRutaData.klasifikasiKbli)
      newErrors.klasifikasiKbli = "Klasifikasi KBLI wajib dipilih.";
    if (!addRutaData.jenisUmkm)
      newErrors.jenisUmkm = "Jenis UMKM wajib dipilih.";
    if (!addRutaData.pendapatanSebulanTerakhir)
      newErrors.pendapatanSebulanTerakhir =
        "Pendapatan sebulan terakhir wajib diisi.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatNumber = (input) => {
    // Tambahkan 1 ke input
    const incrementedValue = input + 1;

    // Konversi angka menjadi string dan format dengan padding 3 digit
    const formattedString = incrementedValue.toString().padStart(3, "0");

    return formattedString;
  };

  const handleAddSave = async () => {
    if (!validateForm()) {
      message.error(
        "Mohon lengkapi semua field yang diperlukan dan perbaiki kesalahan.",
        5
      );
      return;
    }

    if (
      errors.latitude ||
      errors.longitude ||
      errors.pendapatanSebulanTerakhir
    ) {
      message.error(
        "Mohon tangani kesalahan terlebih dahulu sebelum menyimpan.",
        5
      );
      return;
    }

    console.log("Add Ruta Data", addRutaData);

    if (addRutaData) {
      try {
        // Fetch data jumlah UMKM di RT tertentu
        const rtResponse = await api.get(`/api/rt/${addRutaData.kodeRt}`);
        const jumlahUmkm = rtResponse.data.data.jml_umkm; // Pastikan `jumlahUmkm` sesuai dengan struktur respons API

        // Logging data yang diterima
        console.log("Jumlah UMKM di RT:", jumlahUmkm);

        // Konversi data yang akan disimpan
        const convertedData = {
          ...addRutaData,
          kode: addRutaData.kodeRt + formatNumber(jumlahUmkm), // Pastikan ini sesuai dengan kebutuhan
          rt: addRutaData.kodeRt.slice(-3),
          pendapatanSebulanTerakhir: parseInt(
            addRutaData.pendapatanSebulanTerakhir
          ),
          latitude: parseFloat(addRutaData.latitude),
          longitude: parseFloat(addRutaData.longitude),
          // jumlahUmkm, // Tambahkan jumlah UMKM ke data yang akan disimpan
        };

        console.log("Data Ruta", convertedData);

        // Lanjutkan dengan penyimpanan data
        await createData(convertedData);

        setAddRutaData({});
        setErrors({});

        setTimeout(() => {
          fetchDataAggregate();
        }, 1000);
      } catch (error) {
        // Tangani kesalahan jika fetch data gagal
        message.error(`Terjadi kesalahan: ${error.message}`, 5);
      }
    }
  };

  const createData = async (data) => {
    setLoading(true);
    try {
      const response = await api.post("/api/rumahTangga", data);
      message.success(`Ruta ${data.namaKrt} berhasil dibuat.`, 5);
      onClose(); // Make sure this is the correct function to close the modal
      fetchData(); // Fetch updated data
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(`Terjadi kesalahan: ${error.response.data.message}`, 5);
      } else {
        message.error(`Terjadi kesalahan: ${error.message}`, 5);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onClose}
      size="lg"
      className="bg-slate-100 font-inter max-h-[90%]"
      classNames={{
        header: "border-b-[1px] border-slate-300",
        footer: "border-t-[1px] border-slate-300",
        body: "overflow-y-auto",
        wrapper: "overflow-y-hidden",
      }}
    >
      <ModalContent className="font-inter text-pdarkblue">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-white bg-slate-600">
              Tambah Rumah Tangga UMKM
            </ModalHeader>
            <ModalBody className="py-4">
              <div className="space-y-4">
                <Input
                  label="Nama KRT"
                  placeholder="Masukkan Nama KRT"
                  fullWidth
                  classNames={{ inputWrapper: "shadow", input: "text-black" }}
                  name="namaKrt"
                  onChange={handleInputChange}
                />
                {errors.namaKrt && (
                  <p className="ml-3 text-sm text-red-600 font-inter">
                    {errors.namaKrt}
                  </p>
                )}
                <Select
                  size="md"
                  label="RT"
                  className="w-full"
                  name="kodeRt"
                  placeholder="Pilih RT"
                  onChange={handleSelectChange}
                >
                  {daftarRt.map((item) => (
                    <SelectItem key={item.kode} value={item.kode}>
                      {"RT" + item.rt}
                    </SelectItem>
                  ))}
                </Select>
                {errors.kodeRt && (
                  <p className="ml-3 text-sm text-red-600 font-inter">
                    {errors.kodeRt}
                  </p>
                )}
                <Select
                  size="md"
                  label="RW"
                  className="w-full"
                  name="rw"
                  placeholder="Pilih RW"
                  onChange={handleSelectChange}
                >
                  {daftarRw.map((item) => (
                    <SelectItem key={item.key} value={item.key}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
                {errors.rw && (
                  <p className="ml-3 text-sm text-red-600 font-inter">
                    {errors.rw}
                  </p>
                )}
                <Select
                  size="md"
                  label="Dusun"
                  className="w-full"
                  name="dusun"
                  placeholder="Pilih Dusun"
                  onChange={handleSelectChange}
                >
                  {daftarDusun.map((item) => (
                    <SelectItem key={item.key} value={item.label}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
                {errors.dusun && (
                  <p className="ml-3 text-sm text-red-600 font-inter">
                    {errors.dusun}
                  </p>
                )}
                <Select
                  size="md"
                  label="Klasifikasi KBLI"
                  className="w-full"
                  name="klasifikasiKbli"
                  placeholder="Pilih Klasifikasi KBLI"
                  onChange={handleSelectChange}
                >
                  {daftarKlasifikasi.map((item) => (
                    <SelectItem key={item.key} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
                {errors.klasifikasiKbli && (
                  <p className="ml-3 text-sm text-red-600 font-inter">
                    {errors.klasifikasiKbli}
                  </p>
                )}
                <Select
                  size="md"
                  label="Jenis UMKM"
                  className="w-full"
                  name="jenisUmkm"
                  placeholder="Pilih Jenis UMKM"
                  onChange={handleSelectChange}
                >
                  {daftarJenisUmkm.map((item) => (
                    <SelectItem key={item.key} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
                {errors.jenisUmkm && (
                  <p className="ml-3 text-sm text-red-600 font-inter">
                    {errors.jenisUmkm}
                  </p>
                )}
                <Input
                  label="Pendapatan Sebulan Terakhir (Rp)"
                  placeholder="Masukkan pendapatan sebulan terakhir"
                  fullWidth
                  classNames={{ inputWrapper: "shadow" }}
                  name="pendapatanSebulanTerakhir"
                  onChange={handleInputChange}
                />
                {errors.pendapatanSebulanTerakhir && (
                  <p className="ml-3 text-sm text-red-600 font-inter">
                    {errors.pendapatanSebulanTerakhir}
                  </p>
                )}
                <Input
                  label="Latitude"
                  placeholder="Masukkan nilai latitude"
                  fullWidth
                  name="latitude"
                  classNames={{ inputWrapper: "shadow" }}
                  onChange={handleInputChange}
                />
                {errors.latitude && (
                  <p className="ml-3 text-sm text-red-600 font-inter">
                    {errors.latitude}
                  </p>
                )}
                <Input
                  label="Longitude"
                  placeholder="Masukkan nilai longitude"
                  fullWidth
                  name="longitude"
                  classNames={{ inputWrapper: "shadow" }}
                  onChange={handleInputChange}
                />
                {errors.longitude && (
                  <p className="ml-4 text-sm text-red-600 font-inter">
                    {errors.longitude}
                  </p>
                )}
                {isValidLatitude(mapPosition[0]) &&
                  isValidLongitude(mapPosition[1]) && (
                    <div className="my-4">
                      <p className="text-[14px] font-semibold ml-3 my-2">
                        Titik lokasi Rumah Tangga UMKM
                      </p>
                      <MapContainer
                        center={mapPosition}
                        zoom={18}
                        scrollWheelZoom={false}
                        style={{ height: "200px", width: "100%" }}
                        className="border-4 rounded-lg border-slate-300"
                      >
                        {/* <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        /> */}
                        <TileLayer
                          url="https://mt.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                          attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                        />
                        <MapUpdater position={mapPosition} />
                        <Marker position={mapPosition}>
                          <Popup>Posisi Rumah Tangga UMKM</Popup>
                        </Marker>
                      </MapContainer>
                    </div>
                  )}
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Tutup
              </Button>
              <Button
                className="bg-[#0B588F] text-white font-inter font-semibold"
                onPress={handleAddSave}
                disabled={loading}
              >
                {loading ? (
                  <Bars width="25" height="25" color="#ffffff" />
                ) : (
                  "Tambah"
                )}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AddRutaModal;
