import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Input,
  Button,
  useDisclosure,
  Pagination,
} from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import {
  bentuk_badan_usaha,
  columns,
  jenis_kelamin,
  kategori_usaha,
  lokasi_tempat_usaha,
  pendidikan_terakhir,
  skala_usaha,
} from "./data";
import { SearchIcon } from "./SearchIcon";
import "./table.css";
import { FaPlus } from "react-icons/fa6";
import { message, Popconfirm } from "antd";
import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { Bars } from "react-loader-spinner";
import "leaflet/dist/leaflet.css";
import AddRutaModal from "./AddRutaModal";
import DetailRutaModal from "./DetailRutaModal";
import EditRutaModal from "./EditRutaModal";

const RutaTable = ({ fetchDataAggregate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRuta, setSelectedRuta] = useState(null);
  const [dataRuta, setDataRuta] = useState([]);
  const [dataRt, setDataRt] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onOpenChange: onAddModalOpenChange,
  } = useDisclosure();

  // State untuk modal edit
  const {
    isOpen: isEditModalOpen,
    onOpen: onEditModalOpen,
    onOpenChange: onEditModalOpenChange,
  } = useDisclosure();
  const [editRutaData, setEditRutaData] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isSatuan, setIsSatuan] = useState(true);
  const [loading, setLoading] = useState(true); // State untuk loading

  const fetchData = async () => {
    setLoading(true); // Mulai loading
    try {
      const [rtResponse, rutaResponse] = await Promise.all([
        api.get("/api/rt"),
        api.get("/api/rumahTangga"),
      ]);
      setDataRt(rtResponse.data.data);
      console.log("Check dataRt", rtResponse.data.data);
      setDataRuta(rutaResponse.data.data);
      console.log("Check dataRuta", rutaResponse.data.data);
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

  const deleteData = async (ruta) => {
    setLoading(true);
    try {
      await api.delete(`/api/rumahTangga/${ruta.kode}`);
      setDataRuta(dataRuta.filter((item) => item.kode !== ruta.kode));
      message.success(
        `UMKM ${ruta.nama_pemilik_penanggungjawab} berhasil dihapus.`,
        5
      );
      fetchData();
      fetchDataAggregate();
    } catch (error) {
      // Cek jika error memiliki respons body
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(
          `Terjadi kesalahan pada proses hapus data: ${error.response.data.message}`,
          5
        );
      } else {
        // Jika error tidak memiliki respons body yang dapat diakses
        message.error(
          `Terjadi kesalahan pada proses hapus data: ${error.message}`,
          5
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch data from API
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDetailClick = (ruta) => {
    setSelectedRuta(ruta);
    onOpen();
  };

  const handleEditClick = (ruta) => {
    console.log("handleEditClick: ", ruta);
    setEditRutaData(ruta);
    onEditModalOpen();
  };

  const handleDelete = (ruta) => {
    deleteData(ruta);
  };

  const filteredData = dataRuta.filter((ruta) =>
    Object.values(ruta).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const renderCell = (ruta, columnKey) => {
    const cellValue = ruta[columnKey];

    switch (columnKey) {
      case "aksi":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Detail">
              <span
                className="text-lg cursor-pointer text-default-400 active:opacity-50"
                onClick={() => handleDetailClick(ruta)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit">
              <span
                className="text-lg cursor-pointer text-default-400 active:opacity-50"
                onClick={() => handleEditClick(ruta)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Hapus">
              <Popconfirm
                title="Hapus Data UMKM"
                description="Anda yakin menghapus data UMKM ini?"
                onConfirm={() => handleDelete(ruta)}
                onOpenChange={() => console.log("open change")}
              >
                <span className="text-lg cursor-pointer text-danger active:opacity-50">
                  <DeleteIcon />
                </span>
              </Popconfirm>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  };

  const [page, setPage] = React.useState(1);
  const rowsPerPage = 25;

  const pages = Math.ceil(dataRuta.length / rowsPerPage);

  console.log(pages);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredData.slice(start, end);
  }, [page, filteredData]);

  const handleSatuanAddModal = () => {
    onAddModalOpen();
    setIsSatuan(true);
  };
  const handleKumpulanAddModal = () => {
    onAddModalOpen();
    setIsSatuan(false);
  };

  return (
    <div className="p-4 bg-[#ffffffb4] rounded-xl">
      <div className="flex justify-between">
        <Input
          label="Pencarian"
          radius="lg"
          classNames={{
            inputWrapper: "shadow",
          }}
          placeholder="Ketikkan kata kunci..."
          startContent={
            <SearchIcon className="mb-0.5 text-pdarkblue pointer-events-none flex-shrink-0" />
          }
          value={searchTerm}
          onChange={handleSearchChange}
          className="mb-4 w-[50%]"
        />
        <div
          className="relative"
          onMouseLeave={() => setDropdownVisible(false)}
        >
          <Button
            color="success"
            className="text-[14px] font-semibold text-white"
            startContent={<FaPlus className="text-[20px] text-white" />}
            onMouseEnter={() => setDropdownVisible(true)}
          >
            Tambah
          </Button>
          {dropdownVisible && (
            <div className="absolute right-0 z-50 mt-2 bg-white border w-full border-gray-200 rounded-xl shadow-lg top-10 text-[14px] text-pdarkblue font-inter">
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 rounded-md hover:bg-gray-100"
                  onClick={handleSatuanAddModal}
                >
                  Satuan
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 rounded-md hover:bg-gray-100"
                  onClick={handleKumpulanAddModal}
                >
                  Kumpulan
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <Table
        aria-label="Example table with custom cells"
        shadow="none"
        className="shadow rounded-xl font-inter"
        classNames={{ loadingWrapper: "mx-auto" }}
        bottomContent={
          <div className="flex justify-center w-full">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader columns={columns} className="font-inter text-pdarkblue">
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "aksi" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={items}
          emptyContent={"Tidak ada data."}
          isLoading={loading}
          loadingContent={
            <Bars width="50" height="50" color="#0B588F" className="mx-auto" />
          }
        >
          {(item) => (
            <TableRow key={item.kode}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DetailRutaModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        selectedRuta={selectedRuta}
      />

      <AddRutaModal
        isOpen={isAddModalOpen}
        onClose={onAddModalOpenChange}
        isSatuan={isSatuan}
        dataRuta={dataRuta}
        daftarRt={dataRt}
        jenis_kelamin={jenis_kelamin}
        pendidikan_terakhir={pendidikan_terakhir}
        kategori_usaha={kategori_usaha}
        bentuk_badan_usaha={bentuk_badan_usaha}
        lokasi_tempat_usaha={lokasi_tempat_usaha}
        skala_usaha={skala_usaha}
        fetchData={fetchData}
        fetchDataAggregate={fetchDataAggregate}
      />

      <EditRutaModal
        isEditModalOpen={isEditModalOpen}
        onEditModalOpenChange={onEditModalOpenChange}
        ruta={editRutaData}
        fetchData={fetchData}
        fetchDataAggregate={fetchDataAggregate}
        daftarRt={dataRt}
        jenis_kelamin={jenis_kelamin}
        pendidikan_terakhir={pendidikan_terakhir}
        kategori_usaha={kategori_usaha}
        bentuk_badan_usaha={bentuk_badan_usaha}
        lokasi_tempat_usaha={lokasi_tempat_usaha}
        skala_usaha={skala_usaha}
      />

      {/* {loading && (
        <div className="fixed inset-0 bg-[#caf4ff85] flex flex-col justify-center items-center z-50 overflow-hidden">
          <Bars
            height="60"
            width="60"
            color="#0B588F"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <p className="mt-3 font-semibold font-inter text-pdarkblue">
            Loading
          </p>
        </div>
      )} */}
    </div>
  );
};

export default RutaTable;
