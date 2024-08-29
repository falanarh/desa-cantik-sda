import React, { useState } from 'react';
import Sidebar from '../SideBar/sidebar';
import styles from '../dashboard/dashboard.module.css';
import {
  FaPlus, FaEdit, FaSort, FaSortUp, FaSortDown, FaTrash, FaArrowLeft, FaArrowRight,
} from 'react-icons/fa';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';

const UsAdmin = () => {
  const formFields = [
    { id: 'name', label: 'Nama' },
    { id: 'status', label: 'Jabatan' },
  ];

  const initData = [
    { name: 'Simoketawang', role: 'Kecamatan Wonoayu', pict: 'https://example.com/file.pdf' },
    { name: 'Simoanginangin', role: 'Kecamatan Wonoayu', pict: 'https://example.com/file.pdf' },
    { name: 'Grogol', role: 'Kecamatan Tulangan', pict: 'https://example.com/file.pdf' },
    { name: 'Sugihwaras', role: 'Kecamatan Candi', pict: 'https://example.com/file.pdf' },
    { name: 'Kedungrejo', role: 'Kecamatan Waru', pict: 'https://example.com/file.pdf' },
    { name: 'Masangankulon', role: 'Kecamatan Sukodono', pict: 'https://example.com/file.pdf' },
  ];

  const skData = [
    { title: 'Simoketawang', link: 'https://example.com/file.pdf' },
    { title: 'Simoanginangin', link: 'https://example.com/file.pdf' },
    { title: 'Grogol', link: 'https://example.com/file.pdf' },
    { title: 'Sugihwaras', link: 'https://example.com/file.pdf' },
  ];

  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(initData.length / itemsPerPage);

  const sortTable = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedData = [...initData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort />;
    return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const { isOpen: isOpenAdd, onOpen: onOpenAdd, onOpenChange: onOpenChangeAdd } = useDisclosure();
  const { isOpen: isOpenSK, onOpen: onOpenSK, onOpenChange: onOpenChangeSK } = useDisclosure();

  const displayedData = initData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-12 bg-gray-100">
        <div className="flex space-x-5 mb-5">
          {/* Buttons to open modals */}
          <Button className='text-white font-inter font-semibold bg-[#fcc300]' onPress={onOpenAdd}>
            <FaPlus className={styles.addIcon} />
            Tambah Tim Desa Cantik
          </Button>
          <Button className='text-white font-inter font-semibold bg-[#fcc300]' onPress={onOpenSK}>
            <FaPlus className={styles.addIcon} />
            Tambah Surat Keputusan
          </Button>
        </div>

        {/* Tim Desa Cantik Table */}
        <div className="bg-white p-10 rounded-xl shadow-lg mt-10">
          <h3 className="text-xl text-[#ff9c37] font-inter font-bold">Tabel Tim Desa Cantik</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th onClick={() => sortTable('name')}>
                  <span>Nama {getSortIcon('name')}</span>
                </th>
                <th onClick={() => sortTable('role')}>
                  <span>Jabatan {getSortIcon('role')}</span>
                </th>
                <th>Tautan Foto</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.role}</td>
                  <td>
                    <a
                      href={item.pict}
                      className="text-blue-500 hover:text-blue-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat Foto
                    </a>
                  </td>
                  <td>
                    <button
                      className="text-orange-500 hover:text-orange-600"
                      onClick={() => alert('Edit Item')}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600 ml-2"
                      onClick={() => alert('Delete Item')}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-5">
            <button
              className={`px-4 py-2 rounded-lg text-white bg-orange-500 hover:bg-orange-600 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <FaArrowLeft />
            </button>
            <span className="px-4 py-2 bg-orange-100 text-orange-500 rounded-lg font-semibold">
              {currentPage} dari {totalPages}
            </span>
            <button
              className={`px-4 py-2 rounded-lg text-white bg-orange-500 hover:bg-orange-600 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Surat Keputusan Table */}
        <div className="bg-white p-10 rounded-xl shadow-lg mt-10">
          <h3 className="text-xl text-[#ff9c37] font-inter font-bold">Tabel Surat Keputusan</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Judul Surat Keputusan</th>
                <th>Tautan</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {skData.map((sk, index) => (
                <tr key={index}>
                  <td>{sk.title}</td>
                  <td>
                    <a
                      href={sk.link}
                      className="text-blue-500 hover:text-blue-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Lihat Surat Keputusan
                    </a>
                  </td>
                  <td>
                    <button
                      className="text-orange-500 hover:text-orange-600"
                      onClick={() => alert('Edit Item')}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-600 ml-2"
                      onClick={() => alert('Delete Item')}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal for Tambah Tim Desa Cantik */}
        <Modal isOpen={isOpenAdd} onOpenChange={onOpenChangeAdd} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-2 p-4 border-b bg-[#f08f7a]">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-assistant font-semibold text-white">Tambah Tim Desa Cantik</h3>
                    <button 
                      className="text-white hover:text-gray-50 text-xl"
                      onClick={onClose}
                    >
                      &times;
                    </button>
                  </div>
                </ModalHeader>
                <ModalBody className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label 
                        htmlFor="nama"
                        className="block text-gray-700 font-assistant font-semibold mb-1"
                      >
                        Nama
                      </label>
                      <input
                        type="text"
                        id="nama"
                        placeholder="Masukkan Nama"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="role"
                        className="block text-gray-700 font-assistant font-semibold mb-1"
                      >
                        Jabatan
                      </label>
                      <input
                        type="text"
                        id="role"
                        placeholder="Masukkan Jabatan"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="unggah-gambar"
                        className="block text-gray-700 font-assistant font-semibold mb-1"
                      >
                        Unggah Gambar
                      </label>
                      <input
                        type="file"
                        id="unggah-gambar"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter className="p-4 flex justify-end gap-2 ">
                  <Button 
                    color="primary" 
                    className="px-4 py-2 bg-[#f49b88] text-white rounded-md font-assistant font-semibold hover:bg-[#c45f4a]"
                  >
                    Tambah
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>

        {/* Modal for Tambah Surat Keputusan */}
        <Modal isOpen={isOpenSK} onOpenChange={onOpenChangeSK} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-2 p-4 border-b bg-[#f08f7a]">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-assistant font-semibold text-white">Tambah Surat Keputusan</h3>
                    <button 
                      className="text-white hover:text-gray-50 text-xl"
                      onClick={onClose}
                    >
                      &times;
                    </button>
                  </div>
                </ModalHeader>
                <ModalBody className="p-4">
                  <div className="space-y-4">
                    <div>
                      <label 
                        htmlFor="judul"
                        className="block text-gray-700 font-assistant font-semibold mb-1"
                      >
                        Judul Surat Keputusan
                      </label>
                      <input
                        type="text"
                        id="judul"
                        placeholder="Masukkan Judul"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                      />
                    </div>
                    <div>
                      <label 
                        htmlFor="file"
                        className="block text-gray-700 font-assistant font-semibold mb-1"
                      >
                        Unggah Surat Keputusan
                      </label>
                      <input
                        type="file"
                        id="file"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                      />
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter className="p-4 flex justify-end gap-2 ">
                  <Button 
                    color="primary" 
                    className="px-4 py-2 bg-[#f49b88] text-white rounded-md font-assistant font-semibold hover:bg-[#c45f4a]"
                  >
                    Tambah
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </main>
    </div>
  );
};

export default UsAdmin;