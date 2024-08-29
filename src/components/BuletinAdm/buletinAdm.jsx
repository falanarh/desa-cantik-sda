import React, { useState } from 'react';
import styles from './buletinAdm.module.css';
import { FaEdit, FaSort, FaSortUp, FaSortDown, FaPlus, FaTrash } from 'react-icons/fa';
import Sidebar from '../SideBar/sidebar.jsx'; // Ensure the path is correct
import Modal from '../Modal/BuletinModal/buletinModal.jsx';

const BuletinAdm = () => {
  const initialData = [
    { no: 1, title: 'Buletin 1', daterel: '20 July 2024', date: 'June 2024', desc:'Lorem Ipsum', fileLink: 'Link 1' },
    { no: 2, title: 'Buletin 2', daterel: '20 July 2024', date: 'June 2024', desc:'Lorem Ipsum', fileLink: 'Link 2' },
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
      no: parseInt(formData.get('no'), 10),
      title: formData.get('title'),
      daterel: formData.get('daterel'),
      date: formData.get('date'),
      desc: formData.get('desc'),
      fileLink: formData.get('fileLink'),
    };

    if (modalType === 'add') {
      setData([...data, { ...newItem, no: data.length + 1 }]);
    } else if (modalType === 'edit' && currentItem) {
      setData(data.map(item => item.no === currentItem.no ? newItem : item));
    }

    handleCloseModal();
  };

  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.buletinContainer}>
        <div className={styles.tableContainer}>
          <button className={styles.addButton} onClick={handleAddClick}>
            <FaPlus className={styles.addIcon}/> Tambah Buletin
          </button>
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
                  <span>Deskripsi </span>
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
                    <button className={styles.actionButton} onClick={() => handleEditClick(item)}>
                      <FaEdit className={styles.editIcon} />
                    </button>
                    <button className={styles.actionButton}>
                      <FaTrash className={styles.editIcon} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        <div className={styles.pagination}>
          <button className={styles.pageButton} onClick={prevPage} disabled={currentPage === 1}>
            «
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`${styles.pageButton} ${currentPage === i + 1 ? styles.activePageButton : ''}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button className={styles.pageButton} onClick={nextPage} disabled={currentPage === totalPages}>
            »
          </button>
        </div>
        </div>
        </div>
      </div>
      <Modal show={showModal} onClose={handleCloseModal}>
        <form onSubmit={handleFormSubmit} className={styles.modalForm}>
          <h3 className='font-bold font-inter text-center text-[18px] text-[#c46024]'>
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
          <div className={styles.formGroup}>
            <label>Tanggal Kegiatan:</label>
            <input type="date" name="date" defaultValue={currentItem?.date || ''} required />
          </div>
          <div className={styles.formGroup}>
            <label>Tanggal Rilis:</label>
            <input type="date" name="daterel" defaultValue={currentItem?.daterel || ''} required />
          </div>
          <div className={styles.formGroup}>
            <label>Deskripsi:</label>
            <textarea 
              name="desc" 
              defaultValue={currentItem?.desc || ''} 
              required 
              rows="3" /* Adjust rows to fit your needs */
              className={styles.textarea}
            />
          </div>
          <div className={styles.formGroup}>
            <label>File Link:</label>
            <input type="text" name="fileLink" defaultValue={currentItem?.fileLink || ''} required />
          </div>
          <button type="submit" className={styles.submitButton}>
            {modalType === 'add' ? 'Tambah' : 'Update'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default BuletinAdm;