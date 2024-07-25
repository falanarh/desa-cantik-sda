/* eslint-disable react/prop-types */
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
  ModalFooter,
  ModalContent,
  Modal,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Pagination,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import {
  columns,
  daftarRuta,
  daftarKlasifikasi,
  daftarJenisUmkm,
  daftarRt,
  daftarRw,
  daftarDusun,
  daftarRuta as initialData,
} from "./data";
import { SearchIcon } from "./SearchIcon";
import "./table.css";
import { FaPlus } from "react-icons/fa6";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload, Popconfirm } from "antd";
import React, { useState } from "react";

const { Dragger } = Upload;
const uploadProps = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

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
              {ruta.nama_krt}
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
            <td className="p-3 text-right border border-gray-300">
              {ruta.dusun}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Klasifikasi KBLI
            </th>
            <td className="p-3 text-right border border-gray-300">
              {ruta.klasifikasi_klbi}
            </td>
          </tr>
          <tr className="bg-white/70">
            <th className="p-3 font-semibold text-left border border-gray-300">
              Jenis UMKM
            </th>
            <td className="p-3 text-right border border-gray-300">
              {ruta.jenis_umkm}
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
    </div>
  );
};

const RutaTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRuta, setSelectedRuta] = useState(null); // State untuk menyimpan RT yang dipilih
  const [data, setData] = useState(initialData); // State untuk data RT
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDetailClick = (ruta) => {
    setSelectedRuta(ruta);
    onOpen();
  };

  const handleEditClick = (ruta) => {
    setEditRutaData(ruta);
    onEditModalOpen();
  };

  const handleDelete = (ruta) => {
    setData(data.filter((item) => item.kode !== ruta.kode));
    message.success(`Rumah tangga ${ruta.nama_krt} berhasil dihapus.`);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRutaData({ ...editRutaData, [name]: value });
  };

  const handleEditSave = () => {
    setData(
      data.map((item) =>
        item.kode === editRutaData.kode ? editRutaData : item
      )
    );
    message.success(`Rumah tangga ${editRutaData.nama_krt} berhasil diupdate.`);
    onEditModalOpenChange(false);
  };

  const filteredData = data.filter((ruta) =>
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

  const pages = Math.ceil(daftarRuta.length / rowsPerPage);

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

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        className="font-inter bg-slate-100"
        classNames={{
          header: "border-b-[1px] border-slate-300",
          footer: "border-t-[1px] border-slate-300",
        }}
      >
        <ModalContent className="font-inter text-pdarkblue">
          <ModalHeader className="flex flex-col gap-1 text-white bg-slate-600">
            Detail Rumah Tangga UMKM
          </ModalHeader>
          <ModalBody className="py-4">
            <RutaDetail ruta={selectedRuta} />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Modal untuk Tambah */}
      <Modal
        isOpen={isAddModalOpen}
        onOpenChange={onAddModalOpenChange}
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
                    label="Kode"
                    placeholder="Masukkan kode"
                    fullWidth
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Nama KRT"
                    placeholder="Masukkan Nama KRT"
                    fullWidth
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Select size="md" label="RT" className="w-full" placeholder="Masukkan RT">
                    {daftarRt.map((rt) => (
                      <SelectItem key={rt.key}>{rt.label}</SelectItem>
                    ))}
                  </Select>
                  <Select size="md" label="RW" className="w-full" placeholder="Masukkan RW">
                    {daftarRw.map((rw) => (
                      <SelectItem key={rw.key}>{rw.label}</SelectItem>
                    ))}
                  </Select>
                  <Select size="md" label="Dusun" className="w-full" placeholder="Masukkan Dusun">
                    {daftarDusun.map((dusun) => (
                      <SelectItem key={dusun.key}>{dusun.label}</SelectItem>
                    ))}
                  </Select>
                  <Select
                    size="md"
                    label="Klasifikasi UMKM"
                    className="w-full"
                    placeholder="Masukkan Klasifikasi UMKM"
                  >
                    {daftarKlasifikasi.map((klasifikasi) => (
                      <SelectItem key={klasifikasi.key}>
                        {klasifikasi.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select size="md" label="Jenis UMKM" className="w-full" placeholder="Masukkan Jenis UMKM">
                    {daftarJenisUmkm.map((jenis) => (
                      <SelectItem key={jenis.key}>{jenis.label}</SelectItem>
                    ))}
                  </Select>
                  <Input
                    label="Latitude"
                    placeholder="Masukkan nilai latitude"
                    fullWidth
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Longitude"
                    placeholder="Masukkan nilai longitude"
                    fullWidth
                    classNames={{ inputWrapper: "shadow" }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Tutup
                </Button>
                <Button
                  className="bg-[#0B588F] text-white font-inter font-semibold"
                  onPress={onClose}
                >
                  Tambah
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Modal untuk Edit */}
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
      >
        <ModalContent className="font-inter text-pdarkblue">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white bg-slate-600">
                Edit Rumah Tangga UMKM
              </ModalHeader>
              <ModalBody className="py-4">
                {/* Form untuk mengedit Ruta */}
                <div className="space-y-4">
                  <Input
                    label="Kode"
                    placeholder="Masukkan kode"
                    fullWidth
                    name="kode"
                    value={editRutaData?.kode ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Nama KRT"
                    placeholder="Masukkan Nama KRT"
                    fullWidth
                    name="nama_krt"
                    value={editRutaData?.nama_krt ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="RT"
                    placeholder="Masukkan RT"
                    fullWidth
                    name="rt"
                    value={editRutaData?.rt ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="RW"
                    placeholder="Masukkan RW"
                    fullWidth
                    name="rw"
                    value={editRutaData?.rw ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Dusun"
                    placeholder="Masukkan dusun"
                    fullWidth
                    name="dusun"
                    value={editRutaData?.dusun ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Klasifikasi KBLI"
                    placeholder="Masukkan klasifikasi KBLI"
                    fullWidth
                    name="klasifikasi_klbi"
                    value={editRutaData?.klasifikasi_klbi ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Jenis UMKM"
                    placeholder="Masukkan jenis UMKM"
                    fullWidth
                    name="jenis_umkm"
                    value={editRutaData?.jenis_umkm ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Latitude"
                    placeholder="Masukkan latitude"
                    fullWidth
                    name="latitude"
                    value={editRutaData?.latitude ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Longitude"
                    placeholder="Masukkan longitude"
                    fullWidth
                    name="longitude"
                    value={editRutaData?.longitude ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Tutup
                </Button>
                <Button
                  className="bg-[#0B588F] text-white font-inter font-semibold"
                  onPress={handleEditSave}
                >
                  Simpan
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default RutaTable;
