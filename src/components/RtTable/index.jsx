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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { EyeIcon } from "./EyeIcon";
import { columns, daftarRt, daftarRt as initialData } from "./data";
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

const RtDetail = ({ rt }) => {
  if (!rt) return null;

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
        </tbody>
      </table>
    </div>
  );
};

const RtTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRt, setSelectedRt] = useState(null); // State untuk menyimpan RT yang dipilih
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
  const [editRtData, setEditRtData] = useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDetailClick = (rt) => {
    setSelectedRt(rt);
    onOpen();
  };

  const handleEditClick = (rt) => {
    setEditRtData(rt);
    onEditModalOpen();
  };

  const handleDelete = (rt) => {
    setData(data.filter((item) => item.kode !== rt.kode));
    message.success(`RT ${rt.rt} berhasil dihapus.`);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRtData({ ...editRtData, [name]: value });
  };

  const handleEditSave = () => {
    setData(
      data.map((item) => (item.kode === editRtData.kode ? editRtData : item))
    );
    message.success(`RT ${editRtData.rt} berhasil diupdate.`);
    onEditModalOpenChange(false);
  };

  const filteredData = data.filter((rt) =>
    Object.values(rt).some((value) =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const renderCell = (rt, columnKey) => {
    const cellValue = rt[columnKey];

    switch (columnKey) {
      case "aksi":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip content="Detail">
              <span
                className="text-lg cursor-pointer text-default-400 active:opacity-50"
                onClick={() => handleDetailClick(rt)}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content="Edit">
              <span
                className="text-lg cursor-pointer text-default-400 active:opacity-50"
                onClick={() => handleEditClick(rt)}
              >
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Hapus">
              <Popconfirm
                title="Hapus Rukun Tetangga (RT)"
                description="Anda yakin menghapus RT ini?"
                onConfirm={() => handleDelete(rt)}
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

  const pages = Math.ceil(daftarRt.length / rowsPerPage);

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
        <Dropdown className="font-inter text-pdarkblue">
          <DropdownTrigger>
            <Button
              color="success"
              className="text-[14px] font-semibold text-white"
              startContent={<FaPlus className="text-[20px] text-white" />}
              // onClick={onAddModalOpen}
            >
              Tambah
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="add-one" onClick={onAddModalOpen}>
              <p className="font-semibold">Satuan</p>
            </DropdownItem>
            <DropdownItem key="add-many">
              <p className="font-semibold">Kumpulan</p>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
        className="font-inter bg-slate-100 max-h-[90%]"
        classNames={{
          header: "border-b-[1px] border-slate-300",
          footer: "border-t-[1px] border-slate-300",
        }}
      >
        <ModalContent className="font-inter text-pdarkblue">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white bg-slate-600">
                Detail Rukun Tetangga (RT)
              </ModalHeader>
              <ModalBody className="py-4 overflow-y-auto">
                <RtDetail rt={selectedRt} />
              </ModalBody>
            </>
          )}
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
                Tambah Rukun Tetangga (RT)
              </ModalHeader>
              <ModalBody className="py-4">
                {/* Form atau konten lain untuk menambah RT baru */}
                <div className="space-y-4">
                  <Input
                    label="Kode"
                    placeholder="Masukkan kode"
                    fullWidth
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="RT"
                    placeholder="Masukkan RT"
                    fullWidth
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="RW"
                    placeholder="Masukkan RW"
                    fullWidth
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Jumlah UMKM"
                    placeholder="Masukkan jumlah UMKM"
                    fullWidth
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Jumlah UMKM Tetap"
                    placeholder="Masukkan jumlah UMKM tetap"
                    fullWidth
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Jumlah UMKM Non Tetap"
                    placeholder="Masukkan jumlah UMKM non tetap"
                    fullWidth
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <div className="flex flex-col text-pdarkblue font-inter">
                    <p className="font-semibold text-[14px] ml-3 mb-3">
                      Upload geoJSON
                    </p>
                    <Dragger {...uploadProps}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited
                        from uploading company data or other banned files.
                      </p>
                    </Dragger>
                  </div>
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
          Edit Rukun Tetangga (RT)
        </ModalHeader>
        <ModalBody className="py-4">
          {/* Form untuk mengedit RT */}
          <div className="space-y-4">
            <Input
              label="Kode"
              placeholder="Masukkan kode"
              fullWidth
              name="kode"
              value={editRtData?.kode ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="RT"
              placeholder="Masukkan RT"
              fullWidth
              name="rt"
              value={editRtData?.rt ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="RW"
              placeholder="Masukkan RW"
              fullWidth
              name="rw"
              value={editRtData?.rw ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Dusun"
              placeholder="Masukkan dusun"
              fullWidth
              name="dusun"
              value={editRtData?.dusun ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah Ruta"
              placeholder="Masukkan jumlah Ruta"
              fullWidth
              name="jml_ruta"
              value={editRtData?.jml_ruta ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM"
              placeholder="Masukkan jumlah UMKM"
              fullWidth
              name="jml_umkm"
              value={editRtData?.jml_umkm ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM Tetap"
              placeholder="Masukkan jumlah UMKM tetap"
              fullWidth
              name="jml_umkm_tetap"
              value={editRtData?.jml_umkm_tetap ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM Non Tetap"
              placeholder="Masukkan jumlah UMKM non tetap"
              fullWidth
              name="jml_umkm_nontetap"
              value={editRtData?.jml_umkm_nontetap ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI A)"
              placeholder="Masukkan jumlah UMKM KBLI A"
              fullWidth
              name="jml_umkm_kbli_a"
              value={editRtData?.jml_umkm_kbli_a ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI B)"
              placeholder="Masukkan jumlah UMKM KBLI B"
              fullWidth
              name="jml_umkm_kbli_b"
              value={editRtData?.jml_umkm_kbli_b ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI C)"
              placeholder="Masukkan jumlah UMKM KBLI C"
              fullWidth
              name="jml_umkm_kbli_c"
              value={editRtData?.jml_umkm_kbli_c ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI D)"
              placeholder="Masukkan jumlah UMKM KBLI D"
              fullWidth
              name="jml_umkm_kbli_d"
              value={editRtData?.jml_umkm_kbli_d ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI E)"
              placeholder="Masukkan jumlah UMKM KBLI E"
              fullWidth
              name="jml_umkm_kbli_e"
              value={editRtData?.jml_umkm_kbli_e ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI F)"
              placeholder="Masukkan jumlah UMKM KBLI F"
              fullWidth
              name="jml_umkm_kbli_f"
              value={editRtData?.jml_umkm_kbli_f ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI G)"
              placeholder="Masukkan jumlah UMKM KBLI G"
              fullWidth
              name="jml_umkm_kbli_g"
              value={editRtData?.jml_umkm_kbli_g ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI H)"
              placeholder="Masukkan jumlah UMKM KBLI H"
              fullWidth
              name="jml_umkm_kbli_h"
              value={editRtData?.jml_umkm_kbli_h ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI I)"
              placeholder="Masukkan jumlah UMKM KBLI I"
              fullWidth
              name="jml_umkm_kbli_i"
              value={editRtData?.jml_umkm_kbli_i ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI J)"
              placeholder="Masukkan jumlah UMKM KBLI J"
              fullWidth
              name="jml_umkm_kbli_j"
              value={editRtData?.jml_umkm_kbli_j ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI K)"
              placeholder="Masukkan jumlah UMKM KBLI K"
              fullWidth
              name="jml_umkm_kbli_k"
              value={editRtData?.jml_umkm_kbli_k ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI L)"
              placeholder="Masukkan jumlah UMKM KBLI L"
              fullWidth
              name="jml_umkm_kbli_l"
              value={editRtData?.jml_umkm_kbli_l ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI M)"
              placeholder="Masukkan jumlah UMKM KBLI M"
              fullWidth
              name="jml_umkm_kbli_m"
              value={editRtData?.jml_umkm_kbli_m ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI N)"
              placeholder="Masukkan jumlah UMKM KBLI N"
              fullWidth
              name="jml_umkm_kbli_n"
              value={editRtData?.jml_umkm_kbli_n ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI O)"
              placeholder="Masukkan jumlah UMKM KBLI O"
              fullWidth
              name="jml_umkm_kbli_o"
              value={editRtData?.jml_umkm_kbli_o ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI P)"
              placeholder="Masukkan jumlah UMKM KBLI P"
              fullWidth
              name="jml_umkm_kbli_p"
              value={editRtData?.jml_umkm_kbli_p ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI Q)"
              placeholder="Masukkan jumlah UMKM KBLI Q"
              fullWidth
              name="jml_umkm_kbli_q"
              value={editRtData?.jml_umkm_kbli_q ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI R)"
              placeholder="Masukkan jumlah UMKM KBLI R"
              fullWidth
              name="jml_umkm_kbli_r"
              value={editRtData?.jml_umkm_kbli_r ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI S)"
              placeholder="Masukkan jumlah UMKM KBLI S"
              fullWidth
              name="jml_umkm_kbli_s"
              value={editRtData?.jml_umkm_kbli_s ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI T)"
              placeholder="Masukkan jumlah UMKM KBLI T"
              fullWidth
              name="jml_umkm_kbli_t"
              value={editRtData?.jml_umkm_kbli_t ?? ""}
              onChange={handleEditChange}
              classNames={{ inputWrapper: "shadow" }}
            />
            <Input
              label="Jumlah UMKM (KBLI U)"
              placeholder="Masukkan jumlah UMKM KBLI U"
              fullWidth
              name="jml_umkm_kbli_u"
              value={editRtData?.jml_umkm_kbli_u ?? ""}
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

export default RtTable;
