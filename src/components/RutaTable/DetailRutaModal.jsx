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
import { daftarKlasifikasi } from "./data";

const getKbliLabel = (key) => {
  const klasifikasi = daftarKlasifikasi.find((item) => item.key === key);
  return klasifikasi ? klasifikasi.label : "Unknown";
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
  if (typeof string !== 'string' || string.length === 0) {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const RutaDetail = ({ ruta }) => {
  if (!ruta) return null;

  return (
    <div className="p-4">
      <table className="w-full overflow-hidden border border-gray-300 rounded-lg table-auto table-detail-ruta">
        <tbody className="text-[14px]">
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Kode
            </th>
            <td className="p-3 text-right border border-gray-300">
              {ruta.kode}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Nama KRT
            </th>
            <td className="p-3 text-right border border-gray-300">
              {ruta.namaKrt}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              RT
            </th>
            <td className="p-3 text-right border border-gray-300">{ruta.rt}</td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              RW
            </th>
            <td className="p-3 text-right border border-gray-300">{ruta.rw}</td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Dusun
            </th>
            <td className="p-3 text-right border border-gray-300">{capitalizeFirstLetter(ruta.dusun)}</td>
          </tr>
          {/* <tr className="bg-white/70">
              <th className="p-3 font-semibold text-left border border-gray-300">
                Dusun
              </th>
              <td className="p-3 text-right border border-gray-300">
                {ruta.dusun}
              </td>
            </tr> */}
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Klasifikasi KBLI
            </th>
            <td className="p-3 text-right border border-gray-300">
              {getKbliLabel(ruta.klasifikasiKbli)}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jenis UMKM
            </th>
            <td className="p-3 text-right border border-gray-300">
              {ruta.jenisUmkm === "tetap"
                ? "Tetap"
                : ruta.jenisUmkm === "nontetap"
                ? "Non Tetap"
                : ruta.jenisUmkm}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Pendapatan Sebulan Terakhir (Rp)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {ruta.pendapatanSebulanTerakhir
                ? ruta.pendapatanSebulanTerakhir.toLocaleString("id-ID")
                : "-"}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Latitude
            </th>
            <td className="p-3 text-right border border-gray-300">
              {ruta.latitude}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Longitude
            </th>
            <td className="p-3 text-right border border-gray-300">
              {ruta.longitude}
            </td>
          </tr>
        </tbody>
      </table>
      {ruta.latitude && ruta.longitude && (
        <div className="my-4">
          <p className="text-[14px] font-semibold ml-3 my-2">
            Titik lokasi Rumah Tangga UMKM
          </p>
          <MapContainer
            center={[ruta.latitude, ruta.longitude]}
            zoom={18}
            scrollWheelZoom={false}
            style={{ height: "200px", width: "100%" }}
            className="border-4 rounded-lg border-slate-300"
          >
            {/* <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles © Esri"
            />
            <Marker position={[ruta.latitude, ruta.longitude]}></Marker>
          </MapContainer>
        </div>
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