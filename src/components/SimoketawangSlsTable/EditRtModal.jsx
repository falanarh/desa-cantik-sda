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
import api3 from "../../utils/api3";

const EditRtModal = ({
  isEditModalOpen,
  onEditModalOpenChange,
  rt,
  fetchData,
  fetchDataAggregate,
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
        jml_unit_usaha_klengkeng: parseInt(editRtData.jml_unit_usaha_klengkeng, 10) || 0,
        jml_unit_usaha_klengkeng_new_crystal: parseInt(editRtData.jml_unit_usaha_klengkeng_new_crystal, 10) || 0,
        jml_unit_usaha_klengkeng_pingpong: parseInt(editRtData.jml_unit_usaha_klengkeng_pingpong, 10) || 0,
        jml_unit_usaha_klengkeng_matalada: parseInt(editRtData.jml_unit_usaha_klengkeng_matalada, 10) || 0,
        jml_unit_usaha_klengkeng_diamond_river: parseInt(editRtData.jml_unit_usaha_klengkeng_diamond_river, 10) || 0,
        jml_unit_usaha_klengkeng_merah: parseInt(editRtData.jml_unit_usaha_klengkeng_merah, 10) || 0,
        jml_unit_usaha_klengkeng_pupuk_organik: parseInt(editRtData.jml_unit_usaha_klengkeng_pupuk_organik, 10) || 0,
        jml_unit_usaha_klengkeng_pupuk_anorganik: parseInt(editRtData.jml_unit_usaha_klengkeng_pupuk_anorganik, 10) || 0,
        jml_unit_usaha_klengkeng_tidak_ada_pupuk: parseInt(editRtData.jml_unit_usaha_klengkeng_tidak_ada_pupuk, 10) || 0,
        jml_unit_usaha_klengkeng_kopi_biji_klengkeng: parseInt(editRtData.jml_unit_usaha_klengkeng_kopi_biji_klengkeng, 10) || 0,
        jml_unit_usaha_klengkeng_kerajinan_tangan: parseInt(editRtData.jml_unit_usaha_klengkeng_kerajinan_tangan, 10) || 0,
        jml_unit_usaha_klengkeng_batik_ecoprint: parseInt(editRtData.jml_unit_usaha_klengkeng_batik_ecoprint, 10) || 0,
        jml_unit_usaha_klengkeng_minuman: parseInt(editRtData.jml_unit_usaha_klengkeng_minuman, 10) || 0,
        jml_unit_usaha_klengkeng_makanan: parseInt(editRtData.jml_unit_usaha_klengkeng_makanan, 10) || 0,
      };
      console.log("Edit data:", convertedData);
      updateData(convertedData);
    }
  };

  const updateData = async (data) => {
    setLoading(true);
    try {
      const response = await api3.put(`/api/sls/${data.kode}`, data);
      console.log("Data updated:", response.data.data);
      message.success(`SLS ${data.label} berhasil diupdate.`, 5);
      onEditModalOpenChange(false); // Close the modal
      await fetchData(); // Fetch updated data
      await fetchDataAggregate();
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
        size="xl"
        className="bg-slate-100 font-inter max-h-[90%]"
        classNames={{
          header: "border-b-[1px] border-slate-300",
          footer: "border-t-[1px] border-slate-300",
          body: "overflow-y-auto",
          wrapper: "overflow-y-hidden",
        }}
      >
        <ModalContent className="font-inter text-pyellow">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white bg-pyellow">
                Edit Satuan Lingkungan Setempat (SLS)
              </ModalHeader>
              <ModalBody className="py-4">
                <div className="space-y-4 simoketawang-sls-edit">
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
                    disabled
                  />
                  <Input
                    label="RW"
                    placeholder="Masukkan RW"
                    fullWidth
                    name="rw"
                    value={editRtData?.rw ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                    disabled
                  />
                  <Input
                    label="Dusun"
                    placeholder="Masukkan Dusun"
                    fullWidth
                    name="dusun"
                    value={editRtData?.dusun ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                    disabled
                  />
                  <Input
                    label="Unit Usaha Klengkeng"
                    placeholder="Masukkan jumlah unit usaha klengkeng"
                    fullWidth
                    name="jml_unit_usaha_klengkeng"
                    value={editRtData?.jml_unit_usaha_klengkeng ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Unit Usaha Klengkeng New Crystal"
                    placeholder="Masukkan jumlah unit usaha klengkeng new crystal"
                    fullWidth
                    name="jml_unit_usaha_klengkeng_new_crystal"
                    value={editRtData?.jml_unit_usaha_klengkeng_new_crystal ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Unit Usaha Klengkeng Pingpong"
                    placeholder="Masukkan jumlah unit usaha klengkeng pingpong"
                    fullWidth
                    name="jml_unit_usaha_klengkeng_pingpong"
                    value={editRtData?.jml_unit_usaha_klengkeng_pingpong ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Unit Usaha Klengkeng Matalada"
                    placeholder="Masukkan jumlah unit usaha klengkeng matalada"
                    fullWidth
                    name="jml_unit_usaha_klengkeng_matalada"
                    value={editRtData?.jml_unit_usaha_klengkeng_matalada ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Unit Usaha Klengkeng Diamond River"
                    placeholder="Masukkan jumlah unit usaha klengkeng diamond river"
                    fullWidth
                    name="jml_unit_usaha_klengkeng_diamond_river"
                    value={editRtData?.jml_unit_usaha_klengkeng_diamond_river ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Unit Usaha Klengkeng Merah"
                    placeholder="Masukkan jumlah unit usaha klengkeng merah"
                    fullWidth
                    name="jml_unit_usaha_klengkeng_merah"
                    value={editRtData?.jml_unit_usaha_klengkeng_merah ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Unit Usaha Klengkeng Pupuk Organik"
                    placeholder="Masukkan jumlah unit usaha klengkeng pupuk organik"
                    fullWidth
                    name="jml_unit_usaha_klengkeng_pupuk_organik"
                    value={editRtData?.jml_unit_usaha_klengkeng_pupuk_organik ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Unit Usaha Klengkeng Pupuk Anorganik"
                    placeholder="Masukkan jumlah unit usaha klengkeng pupuk anorganik"
                    fullWidth
                    name="jml_unit_usaha_klengkeng_pupuk_anorganik"
                    value={editRtData?.jml_unit_usaha_klengkeng_pupuk_anorganik ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Unit Usaha Klengkeng Tidak Ada Pupuk"
                    placeholder="Masukkan jumlah unit usaha klengkeng tidak ada pupuk"
                    fullWidth
                    name="jml_unit_usaha_klengkeng_tidak_ada_pupuk"
                    value={editRtData?.jml_unit_usaha_klengkeng_tidak_ada_pupuk ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Unit Usaha Klengkeng Kopi Biji"
                    placeholder="Masukkan jumlah unit usaha klengkeng kopi biji"
                    fullWidth
                    name="jml_unit_usaha_klengkeng_kopi_biji_klengkeng"
                    value={editRtData?.jml_unit_usaha_klengkeng_kopi_biji_klengkeng ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Unit Usaha Klengkeng Kerajinan Tangan"
                    placeholder="Masukkan jumlah unit usaha klengkeng kerajinan tangan"
                    fullWidth
                    name="jml_unit_usaha_klengkeng_kerajinan_tangan"
                    value={editRtData?.jml_unit_usaha_klengkeng_kerajinan_tangan ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Unit Usaha Klengkeng Batik Ecoprint"
                    placeholder="Masukkan jumlah unit usaha klengkeng batik ecoprint"
                    fullWidth
                    name="jml_unit_usaha_klengkeng_batik_ecoprint"
                    value={editRtData?.jml_unit_usaha_klengkeng_batik_ecoprint ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Unit Usaha Klengkeng Minuman"
                    placeholder="Masukkan jumlah unit usaha klengkeng minuman"
                    fullWidth
                    name="jml_unit_usaha_klengkeng_minuman"
                    value={editRtData?.jml_unit_usaha_klengkeng_minuman ?? ""}
                    onChange={handleEditChange}
                    classNames={{ inputWrapper: "shadow" }}
                  />
                  <Input
                    label="Unit Usaha Klengkeng Makanan"
                    placeholder="Masukkan jumlah untuk unit usaha klengkeng makanan"
                    fullWidth
                    name="jml_unit_usaha_klengkeng_makanan"
                    value={editRtData?.jml_unit_usaha_klengkeng_makanan ?? ""}
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
                  className="font-semibold text-white bg-pyellow font-inter"
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
