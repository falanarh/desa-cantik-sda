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

const DetailRtModal = ({ isOpen, onOpenChange, selectedRt }) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="lg"
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
              Detail Rukun Tetangga (RT)
            </ModalHeader>
            <ModalBody className="py-4 overflow-y-auto">
              <RtDetail rt={selectedRt} />
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
