import React, { useState } from 'react';
import Sidebar from '../SideBar/sidebar';
import styles from '../dashboard/dashboard.module.css';
import {
  FaPlus, FaEdit, FaSort, FaSortUp, FaSortDown, FaTrash, FaArrowLeft, FaArrowRight,
} from 'react-icons/fa';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from '@nextui-org/react';

const UsAdmin = () => {
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

  const [modalType, setModalType] = useState(null); // State for modal type
  const [editMode, setEditMode] = useState(false);  // State for edit mode
  const [selectedItem, setSelectedItem] = useState(null); // State for selected item
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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

  const openModal = (type, item = null, isEdit = false) => {
    setModalType(type);
    setEditMode(isEdit);
    setSelectedItem(item);
    onOpen();
  };

  const displayedData = initData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto p-12 bg-gray-100">
        <div className="flex space-x-5 mb-5">
          {/* Buttons to open modals */}
          <Button className='text-white font-inter font-semibold text-md bg-[#fcc300]' onPress={() => openModal('timDesaCantik')}>
            <FaPlus />
            Tambah Tim Desa Cantik
          </Button>
          <Button className='text-white font-inter font-semibold text-md bg-[#fcc300]' onPress={() => openModal('suratKeputusan')}>
            <FaPlus className={styles.addIcon} />
            Tambah Surat Keputusan
          </Button>
        </div>

        {/* Tim Desa Cantik Table */}
        <div className="bg-white p-10 rounded-xl shadow-lg mt-10">
          <h3 className="text-xl text-[#ff9c37] font-inter font-bold mb-3">Tabel Tim Desa Cantik</h3>
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
                      onClick={() => openModal('timDesaCantik', item, true)}  // Open modal in edit mode
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
          <h3 className="text-xl text-[#ff9c37] font-inter font-bold mb-3">Tabel Surat Keputusan</h3>
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
                      onClick={() => openModal('suratKeputusan', sk, true)}  // Open modal in edit mode
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

        {/* Dynamic Modal for Both Tim Desa Cantik and Surat Keputusan */}
        <Modal className="bg-[#f5f5f5]" isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} hideCloseButton={true}>
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader>
                  <div className="flex justify-between w-full">
                    <h3 className="text-[18px] text-[#c46024] font-inter font-bold">
                      {editMode ? `Edit ${modalType === 'timDesaCantik' ? 'Tim Desa Cantik' : 'Surat Keputusan'}` : `Tambah ${modalType === 'timDesaCantik' ? 'Tim Desa Cantik' : 'Surat Keputusan'}`}
                    </h3>
                    <button 
                      className="text-xl text-[#BB5A5A]"
                      onClick={onClose}
                    >
                      &times;
                    </button>
                  </div>
                </ModalHeader>
                <ModalBody>
                  {modalType === 'timDesaCantik' ? (
                    <>
                      <label className="font-assistant">Nama:</label>
                      <input type="text" className="w-full p-2 border rounded-lg" defaultValue={editMode && selectedItem ? selectedItem.name : ''} />

                      <label className="font-assistant mt-4">Jabatan:</label>
                      <input type="text" className="w-full p-2 border rounded-lg" defaultValue={editMode && selectedItem ? selectedItem.role : ''} />

                      <label className="font-assistant mt-4">Unggah Foto:</label>
                      <input type="file" className="w-full p-2 border rounded-lg bg-white" />
                    </>
                  ) : (
                    <>
                      <label className="font-inter">Judul Surat Keputusan:</label>
                      <input type="text" className="w-full p-2 border rounded-lg" defaultValue={editMode && selectedItem ? selectedItem.title : ''} />

                      <label className="font-inter mt-4">Unggah Surat Keputusan:</label>
                      <input type="file" className="w-full p-2 border rounded-lg bg-white" />
                    </>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button className='text-white font-inter font-semibold bg-[#fcc300]' onPress={onClose}>{modalType === 'add' ? 'Tambah' : 'Simpan'}</Button>
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