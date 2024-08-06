/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { Input } from "@nextui-org/react"; // Assuming Input is imported from @nextui-org/react
import api from "../../utils/api";
import { message } from "antd";
import { Bars } from "react-loader-spinner";

const EditRtModal = ({
  isEditModalOpen,
  onEditModalOpenChange,
  rt,
  fetchData,
}) => {
  const [editRtData, setEditRtData] = useState(rt);
  const [loading, setLoading] = useState(false);

  // Update editRtData when rt prop changes
  useEffect(() => {
    setEditRtData(rt);
  }, [rt]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRtData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditSave = () => {
    if (editRtData) {
      // Convert attributes to integers
      const convertedData = {
        ...editRtData,
        jml_ruta: parseInt(editRtData.jml_ruta, 10) || 0,
        jml_umkm: parseInt(editRtData.jml_umkm, 10) || 0,
        jml_umkm_tetap: parseInt(editRtData.jml_umkm_tetap, 10) || 0,
        jml_umkm_nontetap: parseInt(editRtData.jml_umkm_nontetap, 10) || 0,
        jml_umkm_kbli_a: parseInt(editRtData.jml_umkm_kbli_a, 10) || 0,
        jml_umkm_kbli_b: parseInt(editRtData.jml_umkm_kbli_b, 10) || 0,
        jml_umkm_kbli_c: parseInt(editRtData.jml_umkm_kbli_c, 10) || 0,
        jml_umkm_kbli_d: parseInt(editRtData.jml_umkm_kbli_d, 10) || 0,
        jml_umkm_kbli_e: parseInt(editRtData.jml_umkm_kbli_e, 10) || 0,
        jml_umkm_kbli_f: parseInt(editRtData.jml_umkm_kbli_f, 10) || 0,
        jml_umkm_kbli_g: parseInt(editRtData.jml_umkm_kbli_g, 10) || 0,
        jml_umkm_kbli_h: parseInt(editRtData.jml_umkm_kbli_h, 10) || 0,
        jml_umkm_kbli_i: parseInt(editRtData.jml_umkm_kbli_i, 10) || 0,
        jml_umkm_kbli_j: parseInt(editRtData.jml_umkm_kbli_j, 10) || 0,
        jml_umkm_kbli_k: parseInt(editRtData.jml_umkm_kbli_k, 10) || 0,
        jml_umkm_kbli_l: parseInt(editRtData.jml_umkm_kbli_l, 10) || 0,
        jml_umkm_kbli_m: parseInt(editRtData.jml_umkm_kbli_m, 10) || 0,
        jml_umkm_kbli_n: parseInt(editRtData.jml_umkm_kbli_n, 10) || 0,
        jml_umkm_kbli_o: parseInt(editRtData.jml_umkm_kbli_o, 10) || 0,
        jml_umkm_kbli_p: parseInt(editRtData.jml_umkm_kbli_p, 10) || 0,
        jml_umkm_kbli_q: parseInt(editRtData.jml_umkm_kbli_q, 10) || 0,
        jml_umkm_kbli_r: parseInt(editRtData.jml_umkm_kbli_r, 10) || 0,
        jml_umkm_kbli_s: parseInt(editRtData.jml_umkm_kbli_s, 10) || 0,
        jml_umkm_kbli_t: parseInt(editRtData.jml_umkm_kbli_t, 10) || 0,
        jml_umkm_kbli_u: parseInt(editRtData.jml_umkm_kbli_u, 10) || 0,
        total_pendapatan_sebulan_terakhir:
          parseInt(editRtData.total_pendapatan_sebulan_terakhir, 10) || 0, // Convert to integer
        rata2_pendapatan_sebulan_terakhir:
          parseInt(editRtData.rata2_pendapatan_sebulan_terakhir, 10) || 0, // Convert to integer
      };

      updateData(convertedData);
    }
  };

  const updateData = async (data) => {
    setLoading(true);
    try {
      const response = await api.put(`/api/rt/${data.kode}`, data);
      console.log("Data updated:", response.data.data);
      message.success(`RT ${data.rt} berhasil diupdate.`, 5);
      onEditModalOpenChange(false); // Close the modal
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
    <>
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
                <div className="space-y-4">
                  <Input
                    label="Kode"
                    placeholder="Masukkan kode"
                    fullWidth
                    name="kode"
                    value={editRtData?.kode ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                    disabled
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
                  <Input
                    label="Total Pendapatan UMKM Sebulan Terakhir (Rp)"
                    placeholder="Masukkan total pendapatan UMKM sebulan terakhir"
                    fullWidth
                    name="total_pendapatan_sebulan_terakhir"
                    value={editRtData?.total_pendapatan_sebulan_terakhir ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Rata-rata Pendapatan UMKM Sebulan Terakhir (Rp)"
                    placeholder="Masukkan rata-rata pendapatan UMKM sebulan terakhir"
                    fullWidth
                    name="rata2_pendapatan_sebulan_terakhir"
                    value={editRtData?.rata2_pendapatan_sebulan_terakhir ?? ""}
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
    </>
  );
};

export default EditRtModal;