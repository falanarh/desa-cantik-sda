import React, { useState } from 'react';
import styles from './buletinAdm.module.css';
import { FaArrowLeft, FaArrowRight, FaEdit, FaSort, FaSortUp, FaSortDown, FaPlus, FaTrash } from 'react-icons/fa';
import Sidebar from '../SideBar/sidebar.jsx';
import Modal from '../Modal/BuletinModal/buletinModal.jsx';
import { Button } from '@nextui-org/react';

const BuletinAdm = () => {
  const initialData = [
    { no: 1, title: 'Buletin 1', daterel: '20 July 2024', date: 'June 2024', desc: 'Lorem Ipsum', fileLink: 'Link 1' },
    { no: 2, title: 'Buletin 2', daterel: '20 July 2024', date: 'June 2024', desc: 'Lorem Ipsum', fileLink: 'Link 2' },
    { no: 3, title: 'Buletin 3', daterel: '20 July 2024', date: 'June 2024', desc:'Lorem Ipsum', fileLink: 'Link 3' },
    { no: 4, title: 'Buletin 4', daterel: '20 July 2024', date: 'June 2024', desc:'Lorem Ipsum', fileLink: 'Link 4' },
    { no: 5, title: 'Buletin 5', daterel: '20 July 2024', date: 'June 2024', desc:'Lorem Ipsum', fileLink: 'Link 5' },
    { no: 6, title: 'Buletin 6', daterel: '20 July 2024', date: 'June 2024', desc:'Lorem Ipsum', fileLink: 'Link 6' },
    { no: 7, title: 'Buletin 7', daterel: '20 July 2024', date: 'June 2024', desc:'Lorem Ipsum', fileLink: 'Link 7' },
    { no: 8, title: 'Buletin 8', daterel: '20 July 2024', date: 'June 2024', desc:'Lorem Ipsum', fileLink: 'Link 8' },
    { no: 9, title: 'Buletin 9', daterel: '20 July 2024', date: 'June 2024', desc:'Lorem Ipsum', fileLink: 'Link 9' },
    { no: 10, title: 'Buletin 10', daterel: '20 July 2024', date: 'June 2024', desc:'Lorem Ipsum', fileLink: 'Link 10' },
  ];

  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add' or 'edit'
  const [currentItem, setCurrentItem] = useState(null);

  const sortTable = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setSortConfig({ key, direction });
    setData(sortedData);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <FaSort />;
    }
    if (sortConfig.direction === 'ascending') {
      return <FaSortUp />;
    }
    return <FaSortDown />;
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleAddClick = () => {
    setCurrentItem(null);
    setModalType('add');
    setShowModal(true);
  };

  const handleEditClick = (item) => {
    setCurrentItem(item);
    setModalType('edit');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    const newItem = {
      no: data.length ? Math.max(...data.map(item => item.no)) + 1 : 1,
      title: formData.get('title'),
      daterel: formData.get('daterel'),
      date: formData.get('date'),
      desc: formData.get('desc'),
      fileLink: formData.get('fileLink'),
    };
  
    if (modalType === 'add') {
      // Add new item to the list
      setData([...data, newItem]);
    } else if (modalType === 'edit' && currentItem) {
      // Update the existing item
      setData(data.map(item => item.no === currentItem.no ? newItem : item));
    }
  
    handleCloseModal();
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.buletinContainer}>
        <div className={styles.tableContainer}>
          <Button className='text-white font-inter font-semibold text-md bg-[#fcc300] mb-5' onClick={handleAddClick}>
            <FaPlus /> Tambah Buletin
          </Button>
          <div className="bg-white p-10 rounded-xl shadow-lg max-w-full w-full mt-5">
            <table className={styles.table}>
              <thead>
                <tr>
                  <th onClick={() => sortTable('no')}>
                    <span>No {getSortIcon('no')}</span>
                  </th>
                  <th onClick={() => sortTable('title')}>
                    <span>Judul {getSortIcon('title')}</span>
                  </th>
                  <th onClick={() => sortTable('daterel')}>
                    <span>Tanggal Rilis {getSortIcon('daterel')}</span>
                  </th>
                  <th onClick={() => sortTable('date')}>
                    <span>Tanggal Kegiatan {getSortIcon('date')}</span>
                  </th>
                  <th>
                    <span>Deskripsi</span>
                  </th>
                  <th>
                    <span>File Link</span>
                  </th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.no}</td>
                    <td>{item.title}</td>
                    <td>{item.daterel}</td>
                    <td>{item.date}</td>
                    <td>{item.desc}</td>
                    <td><a href={item.fileLink} target="_blank" rel="noopener noreferrer">{item.fileLink}</a></td>
                    <td>
                      <button className="text-orange-500 hover:text-orange-600" onClick={() => handleEditClick(item)}>
                        <FaEdit />
                      </button>
                      <button className="text-red-500 hover:text-red-600 ml-2">
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
                onClick={prevPage}
                disabled={currentPage === 1}
              >
                <FaArrowLeft />
              </button>
              <span className="px-4 py-2 bg-orange-100 text-orange-500 rounded-lg font-semibold">
                {currentPage} dari {totalPages}
              </span>
              <button
                className={`px-4 py-2 rounded-lg text-white bg-orange-500 hover:bg-orange-600 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={nextPage}
                disabled={currentPage === totalPages}
              >
                <FaArrowRight />
              </button>
            </div>

          </div>
        </div>
      </div>
      
      <Modal show={showModal} onClose={handleCloseModal}>
      <form onSubmit={handleFormSubmit} className={styles.modalForm}>
        <h3 className='font-bold font-inter text-start text-[18px] text-[#c46024] mb-4'>
          {modalType === 'add' ? 'Tambah Buletin' : 'Edit Buletin'}
        </h3>

        <div className={styles.formGroup}>
          <label>No:</label>
          <input type="text" name="no" defaultValue={currentItem?.no || ''} readOnly />
        </div>

        <div className={styles.formGroup}>
          <label>Judul:</label>
          <input type="text" name="title" defaultValue={currentItem?.title || ''} required />
        </div>

        {/* Combined Tanggal Kegiatan and Tanggal Rilis in one row */}
        <div className={`${styles.formGroup} ${styles.flexRow}`}>
          <div className={styles.flexColumn}>
            <label>Tanggal Kegiatan:</label>
            <input type="date" name="date" defaultValue={currentItem?.date || ''} required />
          </div>
          <div className={styles.flexColumn}>
            <label>Tanggal Rilis:</label>
            <input type="date" name="daterel" defaultValue={currentItem?.daterel || ''} required />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Deskripsi:</label>
          <textarea 
            name="desc" 
            defaultValue={currentItem?.desc || ''} 
            required 
            rows="3" 
          />
        </div>

        <div className={styles.formGroup}>
          <label>File Link:</label>
          <input type="text" name="fileLink" defaultValue={currentItem?.fileLink || ''} required />
        </div>

        <Button className='w-fit self-end text-white font-inter font-semibold bg-[#fcc300]'>
          {modalType === 'add' ? 'Tambah' : 'Simpan'}
        </Button>
      </form>
    </Modal>

    </div>
  );
};

export default BuletinAdm;
