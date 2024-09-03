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
          const label = feature.properties.label;
          const labelIcon = L.divIcon({
            className: "geojson-label",
            html: `<div class="font-inter font-bold text-white text-center w-full">${label}</div>`,
            iconSize: [300, 40],
          });
          L.marker(layer.getBounds().getCenter(), { icon: labelIcon }).addTo(map);
        }
      },
    });
    geoJsonLayer.addTo(map);
    map.fitBounds(geoJsonLayer.getBounds());
    console.log("Fitting bounds:", geoJsonLayer.getBounds());
  }

  // Table columns configuration
  const tableColumns = [
    { label: 'Kode', value: rt.kode },
    { label: 'RT', value: rt.rt },
    { label: 'RW', value: rt.rw },
    { label: 'Dusun', value: rt.dusun },
    { label: 'Jumlah Penduduk', value: rt.jml_penduduk },
    { label: 'Unit Usaha Klengkeng', value: rt.jml_unit_usaha_klengkeng },
    { label: 'Unit Usaha Klengkeng Pupuk Organik', value: rt.jml_unit_usaha_klengkeng_pupuk_organik },
    { label: 'Unit Usaha Klengkeng Pupuk Anorganik', value: rt.jml_unit_usaha_klengkeng_pupuk_anorganik },
    { label: 'Unit Usaha Klengkeng Tidak Ada Pupuk', value: rt.jml_unit_usaha_klengkeng_tidak_ada_pupuk },
    { label: 'Unit Usaha Klengkeng Kopi Biji Klengkeng', value: rt.jml_unit_usaha_klengkeng_kopi_biji_klengkeng },
    { label: 'Unit Usaha Klengkeng Kerajinan Tangan', value: rt.jml_unit_usaha_klengkeng_kerajinan_tangan },
    { label: 'Unit Usaha Klengkeng Batik Ecoprint', value: rt.jml_unit_usaha_klengkeng_batik_ecoprint },
    { label: 'Unit Usaha Klengkeng Minuman', value: rt.jml_unit_usaha_klengkeng_minuman },
    { label: 'Unit Usaha Klengkeng Makanan', value: rt.jml_unit_usaha_klengkeng_makanan },
    { label: 'Unit Usaha Klengkeng Tidak Ada Pemanfaatan', value: rt.jml_unit_usaha_klengkeng_tidak_dimanfaatkan },
    { label: 'Pohon Klengkeng', value: rt.jml_pohon },
    { label: 'Pohon Klengkeng New Crystal', value: rt.jml_pohon_new_crystal },
    { label: 'Pohon Klengkeng Pingpong', value: rt.jml_pohon_pingpong },
    { label: 'Pohon Klengkeng Metalada', value: rt.jml_pohon_metalada },
    { label: 'Pohon Klengkeng Diamond River', value: rt.jml_pohon_diamond_river },
    { label: 'Pohon Klengkeng Merah', value: rt.jml_pohon_merah },
    { label: 'Pohon Klengkeng Belum Berproduksi', value: rt.jml_pohon_blm_berproduksi },
    { label: 'Pohon Klengkeng Sudah Berproduksi', value: rt.jml_pohon_sdh_berproduksi },
    { label: 'Volume Produksi Agustus 2023-Juli 2024 (Kg)', value: rt.volume_produksi },
  ];
  

  return (
    <div className="p-4">
      <table className="w-full overflow-hidden border border-gray-300 rounded-lg table-detail-sls">
        <tbody className="text-[14px]">
          {tableColumns.map((column, index) => (
            <tr key={index} className="bg-white/70">
              <th className="p-3 font-semibold text-left border border-gray-300">
                {column.label}
              </th>
              <td className="p-3 text-right border border-gray-300">
                {column.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {geojson && (
        <div className="my-4">
          <p className="text-[14px] font-semibold ml-3 my-2 text-pyellow">Peta Wilayah SLS</p>
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
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Tiles © Esri"
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
      size="2xl"
      className="font-inter bg-slate-100 max-h-[90%]"
      classNames={{
        header: "border-b-[1px] border-slate-300",
        footer: "border-t-[1px] border-slate-300",
        wrapper: "overflow-y-hidden",
      }}
    >
      <ModalContent className="font-inter text-pyellow">
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-white bg-pyellow">
              Detail {selectedRt.label}
            </ModalHeader>
            <ModalBody className="py-4 overflow-y-auto">
              <RtDetail rt={selectedRt} geojson={geojsonRt} />
            </ModalBody>
            <ModalFooter>
              <Button
                className="font-semibold text-white bg-pyellow font-inter"
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
