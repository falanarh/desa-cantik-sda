/* eslint-disable react/prop-types */
import { useRef } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
} from "@nextui-org/react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const RtDetail = ({ rt, geojson = null }) => {
  const mapRef = useRef();

  console.log("RtDetail: ", rt, geojson);
  if (geojson && mapRef.current) {
    const map = mapRef.current;
    console.log("Map reference:", map);

    // Remove existing GeoJSON layers
    map.eachLayer((layer) => {
      if (layer instanceof L.GeoJSON) {
        map.removeLayer(layer);
      }
    });

    // Add new GeoJSON layer
    const geoJsonLayer = new L.GeoJSON(geojson, {
      onEachFeature: (feature, layer) => {
        layer.on({
          click: () => {
            map.fitBounds(layer.getBounds());
          },
        });

        // Add label
        if (feature.properties && feature.properties.label) {
          const label = feature.properties.label; // Assuming feature.properties.name contains the label text
          const labelIcon = L.divIcon({
            className: "geojson-label",
            html: `<div class="font-inter font-bold text-white text-center w-full">${label}</div>`,
            iconSize: [300, 40], // Adjust size as needed
          });
          L.marker(layer.getBounds().getCenter(), { icon: labelIcon }).addTo(
            map
          );
        }
      },
    });
    geoJsonLayer.addTo(map);
    map.fitBounds(geoJsonLayer.getBounds());
    console.log("Fitting bounds:", geoJsonLayer.getBounds());
  }

  return (
    <div className="p-4">
      <table className="w-full overflow-hidden border border-gray-300 rounded-lg table-detail-rt">
        <tbody className="text-[14px]">
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Kode
            </th>
            <td className="p-3 text-right border border-gray-300">{rt.kode}</td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              RT
            </th>
            <td className="p-3 text-right border border-gray-300">{rt.rt}</td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              RW
            </th>
            <td className="p-3 text-right border border-gray-300">{rt.rw}</td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Dusun
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.dusun}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah Ruta
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_ruta}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM Tetap
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_tetap}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM Non Tetap
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_nontetap}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI A)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_a}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI B)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_b}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI C)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_c}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI D)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_d}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI E)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_e}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI F)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_f}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI G)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_g}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI H)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_h}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI I)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_i}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI J)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_j}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI K)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_k}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI L)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_l}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI M)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_m}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI N)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_n}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI O)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_o}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI P)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_p}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI Q)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_q}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI R)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_r}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI S)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_s}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI T)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_t}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jumlah UMKM (KBLI U)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.jml_umkm_kbli_u}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Total Pendapatan UMKM Sebulan Terakhir (Rp)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.total_pendapatan_sebulan_terakhir.toLocaleString('id-ID')}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Rata-rata Pendapatan UMKM Sebulan Terakhir (Rp)
            </th>
            <td className="p-3 text-right border border-gray-300">
              {rt.rata2_pendapatan_sebulan_terakhir.toLocaleString('id-ID')}
            </td>
          </tr>
        </tbody>
      </table>
      {geojson && (
        <div className="my-4">
          <p className="text-[14px] font-semibold ml-3 my-2">Peta Wilayah RT</p>
          <MapContainer
            key={JSON.stringify(geojson)} // Ensure a new key when geojson changes
            ref={mapRef}
            center={[0, 0]} // Initial center, will be overridden by fitBounds
            zoom={16}
            scrollWheelZoom={false}
            style={{ height: "200px", width: "100%" }}
            className="border-4 rounded-lg border-slate-300"
            whenCreated={(mapInstance) => {
              mapRef.current = mapInstance;
            }}
          >
            {/* <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}
            <TileLayer
              url="https://mt.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              attribution='&copy; <a href="https://www.google.com/maps">Google Maps</a>'
            />
          </MapContainer>
        </div>
      )}
    </div>
  );
};

const DetailRtModal = ({ isOpen, onOpenChange, selectedRt, geojsonRt }) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="xl"
      className="font-inter bg-slate-100 max-h-[90%]"
      classNames={{
        header: "border-b-[1px] border-slate-300",
        footer: "border-t-[1px] border-slate-300",
        wrapper: "overflow-y-hidden",
      }}
    >
      <ModalContent className="font-inter text-pdarkblue">
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-white bg-slate-600">
              Detail {selectedRt.label}
            </ModalHeader>
            <ModalBody className="py-4 overflow-y-auto">
              <RtDetail rt={selectedRt} geojson={geojsonRt} />
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

export default DetailRtModal;
