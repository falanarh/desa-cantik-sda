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
  columns,
  daftarKlasifikasi,
  daftarJenisUmkm,
  daftarRw,
  daftarDusun,
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

  const deleteData = async (ruta) => {
    setLoading(true);
    try {
      await api.delete(`/api/rumahTangga/${ruta.kode}`);
      setDataRuta(dataRuta.filter((item) => item.kode !== ruta.kode));
      message.success(`Rumah Tangga ${ruta.namaKrt} berhasil dihapus.`, 5);
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
    fetchData();
    setTimeout(() => {
      fetchDataAggregate();
    }, 500);
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
                title="Hapus Rumah Tangga"
                description="Anda yakin menghapus Rumah tangga ini?"
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
  const rowsPerPage = 10;

  const pages = Math.ceil(dataRuta.length / rowsPerPage);

  console.log(pages);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredData.slice(start, end);
  }, [page, filteredData]);

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
        <Button
          color="success"
          className="text-[14px] font-semibold text-white"
          startContent={<FaPlus className="text-[20px] text-white" />}
          onClick={onAddModalOpen} // Tambahkan onClick untuk membuka modal tambah
        >
          Tambah
        </Button>
      </div>
      <Table
        aria-label="Example table with custom cells"
        shadow="none"
        className="shadow rounded-xl font-inter"
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
        <TableBody items={items}>
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
        daftarRt={dataRt}
        daftarRw={daftarRw}
        daftarDusun={daftarDusun}
        daftarKlasifikasi={daftarKlasifikasi}
        daftarJenisUmkm={daftarJenisUmkm}
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
        daftarRw={daftarRw}
        daftarDusun={daftarDusun}
        daftarKlasifikasi={daftarKlasifikasi}
        daftarJenisUmkm={daftarJenisUmkm}
      />

      {loading && (
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
      )}
    </div>
  );
};

export default RutaTable;
