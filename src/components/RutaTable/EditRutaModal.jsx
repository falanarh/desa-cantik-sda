/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import api from "../../utils/api";
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

const EditRutaModal = ({
  isEditModalOpen,
  onEditModalOpenChange,
  ruta,
  fetchData,
  fetchDataAggregate,
  daftarRt,
  daftarRw,
  daftarDusun,
  daftarKlasifikasi,
  daftarJenisUmkm,
}) => {
  // Initialize state with default values
  const [editRutaData, setEditRutaData] = useState({});
  const [oldRutaData, setOldRutaData] = useState({});
  const [loading, setLoading] = useState(false);
  const [mapPosition, setMapPosition] = useState([0, 0]); // Initialize map position
  const [selectedRt, setSelectedRt] = useState("");
  const [selectedRw, setSelectedRw] = useState("");
  const [selectedKlasifikasi, setSelectedKlasifikasi] = useState("");
  const [selectedJenisUmkm, setSelectedJenisUmkm] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (ruta) {
      setEditRutaData(ruta);
      setOldRutaData(ruta);
      setSelectedRt(ruta.kodeRt);
      setSelectedRw(ruta.rw);
      setSelectedKlasifikasi(ruta.klasifikasiKbli);
      setSelectedJenisUmkm(ruta.jenisUmkm);
    }
  }, [ruta]);

  // Update mapPosition when ruta changes
  useEffect(() => {
    if (ruta && ruta.latitude && ruta.longitude) {
      setMapPosition([ruta.latitude, ruta.longitude]);
    }
  }, [ruta]);

  useEffect(() => {
    if (editRutaData.latitude && editRutaData.longitude) {
      if (
        (!errors.latitude && !errors.longitude) ||
        (errors.latitude === "" && errors.longitude === "")
      ) {
        setMapPosition([editRutaData.latitude, editRutaData.longitude]);
      }
    }
  }, [editRutaData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditRutaData((prevValues) => ({ ...prevValues, [name]: value }));

    if (name === "namaKrt") {
      if (!value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Nama harus diisi.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }
    }

    if (name === "pendapatanSebulanTerakhir") {
      if (value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Pendapatan sebulan terakhir harus diisi.",
        }));
      } else if (isNaN(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Pendapatan sebulan terakhir harus angka.",
        }));
      } else if (!isValidPendapatanSebulanTerakhir(parseFloat(value))) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Pendapatan sebulan terakhir harus positif.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }
    }

    if (name === "latitude") {
      if (value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Latitude harus diisi.",
        }));
      } else if (isNaN(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Latitude harus angka.",
        }));
      } else if (!isValidLatitude(parseFloat(value))) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Latitude harus antara -90 and 90.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }
    }

    if (name === "longitude") {
      if (value === "") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Longitude harus diisi.",
        }));
      } else if (isNaN(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Longitude harus angka.",
        }));
      } else if (!isValidLongitude(parseFloat(value))) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Longitude harus antara -180 and 180.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }
    }
  };

  const handleSelectChange = (e) => {
    const { name, value } = e.target;
    setEditRutaData((prevValues) => ({ ...prevValues, [name]: value }));

    if (name === "kodeRt") setSelectedRt(value);
    if (name === "rw") setSelectedRw(value);
    if (name === "klasifikasiKbli") setSelectedKlasifikasi(value);
    if (name === "jenisUmkm") setSelectedJenisUmkm(value);
  };

  const validateForm = () => {
    const newErrors = {};

    // Validasi setiap field
    if (!editRutaData.namaKrt) newErrors.namaKrt = "Nama KRT wajib diisi.";
    if (!editRutaData.kodeRt) newErrors.kodeRt = "RT wajib dipilih.";
    if (!editRutaData.rw) newErrors.rw = "RW wajib dipilih.";
    if (!editRutaData.dusun) newErrors.dusun = "Dusun wajib dipilih.";
    if (!editRutaData.klasifikasiKbli)
      newErrors.klasifikasiKbli = "Klasifikasi KBLI wajib dipilih.";
    if (!editRutaData.jenisUmkm)
      newErrors.jenisUmkm = "Jenis UMKM wajib dipilih.";
    if (!editRutaData.pendapatanSebulanTerakhir)
      newErrors.pendapatanSebulanTerakhir =
        "Pendapatan sebulan terakhir wajib diisi.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditSave = () => {
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

    if (editRutaData) {
      const convertedData = {
        ...editRutaData,
        kode: editRutaData.kodeRt + editRutaData.kode.slice(-3),
        rt: editRutaData.kodeRt.slice(-3),
        latitude: parseFloat(editRutaData.latitude),
        longitude: parseFloat(editRutaData.longitude),
      };

      console.log(convertedData);

      updateData(convertedData);

      setTimeout(() => {
        fetchDataAggregate();
      }, 1000);
    }
  };

  const updateData = async (data) => {
    setLoading(true);
    try {
      const response = await api.put(`/api/rumahTangga/${data.kode}`, data);
      message.success(`Ruta ${data.namaKrt} berhasil diupdate.`, 5);
      onEditModalOpenChange(false);
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

  const handleCloseButton = () => {
    setErrors({});
    setEditRutaData(oldRutaData);
    onEditModalOpenChange(false);
  };

  function capitalizeFirstLetter(string) {
    if (typeof string !== 'string' || string.length === 0) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <Modal
      isOpen={isEditModalOpen}
      onOpenChange={onEditModalOpenChange}
      size="lg"
      className="bg-slate-100 font-inter max-h-[90%]"
      classNames={{
        header: "border-b-[1px] border-slate-300",
        footer: "border-t-[1px] border-slate-300",
        body: "overflow-y-auto",
        wrapper: "overflow-y-hidden",
      }}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      hideCloseButton={true}
    >
      <ModalContent className="font-inter text-pdarkblue">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-white bg-slate-600">
              Edit Rumah Tangga UMKM
            </ModalHeader>
            <ModalBody className="py-4">
              <div className="space-y-4">
                <Input
                  label="Kode"
                  placeholder="Masukkan kode"
                  fullWidth
                  name="kode"
                  value={editRutaData?.kode ?? ""}
                  onChange={handleInputChange}
                  classNames={{ inputWrapper: "shadow" }}
                  readOnly
                />
                <Input
                  label="Nama KRT"
                  placeholder="Masukkan Nama KRT"
                  fullWidth
                  name="namaKrt"
                  value={editRutaData?.namaKrt ?? ""}
                  onChange={handleInputChange}
                  classNames={{ inputWrapper: "shadow" }}
                />
                {errors.namaKrt && (
                  <p className="ml-3 text-sm text-red-600 font-inter">
                    {errors.namaKrt}
                  </p>
                )}
                <Input
                  label="RT"
                  fullWidth
                  value={"RT" + editRutaData?.rt ?? ""}
                  classNames={{ inputWrapper: "shadow" }}
                  readOnly
                />
                {/* <Select
                  size="md"
                  label="RT"
                  className="w-full"
                  name="kodeRt"
                  selectedKeys={selectedRt ? [selectedRt] : []}
                  onChange={handleSelectChange}
                  placeholder="Pilih RT"
                  isDisabled
                >
                  {daftarRt.map((item) => (
                    <SelectItem key={item.kode} value={item.kode}>
                      {"RT" + item.rt}
                    </SelectItem>
                  ))}
                </Select> */}
                <Input
                  label="RW"
                  fullWidth
                  value={"RW" + editRutaData?.rw ?? ""}
                  classNames={{ inputWrapper: "shadow" }}
                  readOnly
                />
                {/* <Select
                  size="md"
                  label="RW"
                  className="w-full"
                  name="rw"
                  selectedKeys={selectedRw ? [selectedRw] : []}
                  onChange={handleSelectChange}
                  placeholder="Pilih RW"
                  isDisabled
                >
                  {daftarRw.map((item) => (
                    <SelectItem key={item.key} value={item.label}>
                      {"RW" + item.label}
                    </SelectItem>
                  ))}
                </Select> */}
                <Input
                  label="Dusun"
                  fullWidth
                  value={capitalizeFirstLetter(editRutaData?.dusun ?? "")}
                  classNames={{ inputWrapper: "shadow" }}
                  readOnly
                />
                <Select
                  size="md"
                  label="Klasifikasi UMKM"
                  className="w-full"
                  name="klasifikasiKbli"
                  selectedKeys={
                    selectedKlasifikasi ? [selectedKlasifikasi] : []
                  }
                  onChange={handleSelectChange}
                  placeholder="Pilih Klasifikasi UMKM"
                >
                  {daftarKlasifikasi.map((item) => (
                    <SelectItem key={item.key} value={item.key}>
                      {item.label}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  size="md"
                  label="Jenis UMKM"
                  className="w-full"
                  name="jenisUmkm"
                  selectedKeys={selectedJenisUmkm ? [selectedJenisUmkm] : []}
                  onChange={handleSelectChange}
                  placeholder="Pilih Jenis UMKM"
                >
                  {daftarJenisUmkm.map((jenis) => (
                    <SelectItem key={jenis.key} value={jenis.key}>
                      {jenis.label}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  label="Pendapatan Sebulan Terakhir (Rp)"
                  placeholder="Masukkan pendapatan sebulan terakhir"
                  fullWidth
                  name="pendapatanSebulanTerakhir"
                  value={editRutaData?.pendapatanSebulanTerakhir ?? ""}
                  onChange={handleInputChange}
                  classNames={{ inputWrapper: "shadow" }}
                />
                {errors.pendapatanSebulanTerakhir && (
                  <p className="ml-3 text-sm text-red-600 font-inter">
                    {errors.pendapatanSebulanTerakhir}
                  </p>
                )}
                <Input
                  label="Latitude"
                  placeholder="Masukkan latitude"
                  fullWidth
                  name="latitude"
                  value={editRutaData?.latitude ?? ""}
                  onChange={handleInputChange}
                  classNames={{ inputWrapper: "shadow" }}
                />
                {errors.latitude && (
                  <p className="ml-3 text-sm text-red-600 font-inter">
                    {errors.latitude}
                  </p>
                )}
                <Input
                  label="Longitude"
                  placeholder="Masukkan longitude"
                  fullWidth
                  name="longitude"
                  value={editRutaData?.longitude ?? ""}
                  onChange={handleInputChange}
                  classNames={{ inputWrapper: "shadow" }}
                />
                {errors.longitude && (
                  <p className="ml-4 text-sm text-red-600 font-inter">
                    {errors.longitude}
                  </p>
                )}
                {editRutaData &&
                  editRutaData.latitude &&
                  editRutaData.longitude && (
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
                          url="https://mt.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                          attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
                        /> */}
                        <TileLayer
                          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                          attribution="Tiles © Esri"
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
              <Button
                variant="light"
                color="danger"
                onPress={handleCloseButton}
              >
                Tutup
              </Button>
              <Button
                className="bg-[#0B588F] text-white font-inter font-semibold"
                onPress={handleEditSave}
                disabled={loading}
              >
                {loading ? (
                  <Bars width="25" height="25" color="#ffffff" />
                ) : (
                  "Simpan"
                )}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditRutaModal;
