/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
} from "@nextui-org/react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import {
  jenis_klengkeng,
} from "./data";

const getLabelByKey = (key, array) => {
  const item = array.find((obj) => obj.key === key);
  return item ? item.label : "Label not found";
};

function formatNumber(num) {
  if (typeof num !== "number" || isNaN(num)) {
    throw new Error("Input must be a valid number");
  }

  // Convert number to string
  let numStr = num.toFixed(2); // Ensure that the number has 2 decimal places if it's a float

  // Split integer part and decimal part
  let [integerPart, decimalPart] = numStr.split(".");

  // Use regular expression to add thousands separators
  let formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Combine integer part and decimal part (if any)
  return decimalPart
    ? `${formattedIntegerPart},${decimalPart}`
    : formattedIntegerPart;
}

function capitalizeFirstLetter(string) {
  if (typeof string !== "string" || string.length === 0) {
    return "";
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const TableRow = ({ label, value }) => (
  <tr className="bg-white/70">
    <th className="p-3 font-semibold text-left border border-gray-300">
      {label}
    </th>
    <td className="p-3 text-right border border-gray-300">{value}</td>
  </tr>
);

const RutaMap = ({ latitude, longitude }) => (
  <div className="my-4">
    <p className="text-[14px] font-semibold ml-3 my-2 text-pdarkblue">
      Titik lokasi Rumah Tangga UMKM
    </p>
    <MapContainer
      center={[latitude, longitude]}
      zoom={18}
      scrollWheelZoom={false}
      style={{ height: "200px", width: "100%" }}
      className="border-4 rounded-lg border-slate-300"
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution="Tiles © Esri"
      />
      <Marker position={[latitude, longitude]} />
    </MapContainer>
  </div>
);

const RutaDetail = ({ ruta }) => {
  if (!ruta) return null;

  const rows = [
    { label: "Kode", value: ruta.kode },
    { label: "Identitas SLS", value: ruta.rt_rw_dusun },
    { label: "Nama Kepala Keluarga", value: ruta.nama_kepala_keluarga },
    { label: "Alamat", value: ruta.alamat },
    { label: "Jenis Klengkeng", value: getLabelByKey(ruta.jenis_klengkeng, jenis_klengkeng) },
    { label: "Usia Pohon", value: ruta.usia_pohon },
    // {
    //   label: "Pendidikan Terakhir",
    //   value: getLabelByKey(ruta.pendidikan_terakhir, pendidikan_terakhir),
    // },
    { label: "Nama Usaha", value: ruta.nama_usaha },
    { label: "Kegiatan Utama Usaha", value: ruta.kegiatan_utama_usaha },
    // {
    //   label: "Kategori Usaha",
    //   value: getLabelByKey(ruta.kategori_usaha, kategori_usaha),
    // },
    // { label: "Bentuk Badan Usaha", value: getLabelByKey(ruta.bentuk_badan_usaha, bentuk_badan_usaha) },
    // { label: "Lokasi Tempat Usaha", value: getLabelByKey(ruta.lokasi_tempat_usaha, lokasi_tempat_usaha) },
    // { label: "Skala Usaha", value: getLabelByKey(ruta.skala_usaha, skala_usaha) },
    // { label: "Alamat", value: ruta.alamat },
    { label: "Latitude", value: ruta.latitude },
    { label: "Longitude", value: ruta.longitude },
  ];

  return (
    <div className="p-4">
      <table className="w-full overflow-hidden border border-gray-300 rounded-lg table-auto table-detail-ruta">
        <tbody className="text-[14px]">
          {rows.map((row, index) => (
            <TableRow key={index} label={row.label} value={row.value} />
          ))}
        </tbody>
      </table>
      {ruta.latitude && ruta.longitude && (
        <RutaMap latitude={ruta.latitude} longitude={ruta.longitude} />
      )}
    </div>
  );
};

const DetailRutaModal = ({ isOpen, onOpenChange, selectedRuta }) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xl"
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
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-white bg-slate-600">
              Detail Rumah Tangga UMKM
            </ModalHeader>
            <ModalBody className="py-4">
              <RutaDetail ruta={selectedRuta} />
            </ModalBody>
            <ModalFooter>
              <Button
                className="bg-[#0B588F] text-white font-inter font-semibold"
                onPress={() => onOpenChange(false)}
              >
                Tutup
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DetailRutaModal;
