import React, { useState } from 'react';
import styles from './dashboard.module.css';
import Sidebar from '../SideBar/sidebar.jsx';
import Modal from '../Modal/modal.jsx';
import { FaPlus, FaEdit, FaSort, FaSortUp, FaSortDown, FaTrash } from 'react-icons/fa';

const Dashboard = () => {
  const initialData = [
    { no: 1, name: 'Simoketawang', address: 'Kecamatan Wonoayu', area: '96.53', pict: 'https://example.com/file.pdf' },
    { no: 2, name: 'Simoanginangin', address: 'Kecamatan Wonoayu', area: '42', pict: 'https://example.com/file.pdf' },
    { no: 3, name: 'Grogol', address: 'Kecamatan Tulangan', area: '112.818', pict: 'https://example.com/file.pdf' },
    { no: 4, name: 'Sugihwaras', address: 'Kecamatan Candi', area: '107.168', pict: 'https://example.com/file.pdf' },
    { no: 5, name: 'Kedungrejo', address: 'Kecamatan Waru', area: '86.44', pict: 'https://example.com/file.pdf' },
    { no: 6, name: 'Masangankulon', address: 'Kecamatan Sukodono', area: '2.03', pict: 'https://example.com/file.pdf' },
    { no: 7, name: 'Wangkal', address: 'Kecamatan Krembung', area: '154.77', pict: 'https://example.com/file.pdf' },
    { no: 8, name: 'Kedungturi', address: 'Kecamatan Taman', area: '158.58', pict: 'https://example.com/file.pdf' },
    { no: 9, name: 'Kepunten', address: 'Kecamatan Tulangan', area: '194.5', pict: 'https://example.com/file.pdf' },
    { no: 10, name: 'Kludan', address: 'Kecamatan Tanggulangin', area: '88.20', pict: 'https://example.com/file.pdf' },
  ];

  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('add');
  const [currentItem, setCurrentItem] = useState(null);

  const sortTable = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setSortConfig({ key, direction });
    setData(sortedData);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort />;
    return sortConfig.direction === 'ascending' ? <FaSortUp /> : <FaSortDown />;
  };

  const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(data.length / itemsPerPage);

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
      no: formData.get('no'),
      name: formData.get('name'),
      address: formData.get('address'),
      area: formData.get('area'),
      pict: formData.get('pict'),
    };
    if (modalType === 'add') {
      setData([...data, { ...newItem, no: data.length + 1 }]);
    } else if (modalType === 'edit' && currentItem) {
      setData(data.map(item => item.no === currentItem.no ? newItem : item));
    }
    handleCloseModal();
  };

  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <main className={styles.mainContent}>
        <div className={styles.tableContainer}>
          <button className={styles.addButton} onClick={handleAddClick}>
            <FaPlus className={styles.addIcon} /> Tambah Desa
          </button>
          <div className="bg-white p-10 rounded-xl shadow-lg max-w-full w-full mt-5">
          <table className={styles.table}>
            <thead>
              <tr>
              <th onClick={() => sortTable('no')}>
                  <span>No {getSortIcon('no')}</span>
                </th>
                <th onClick={() => sortTable('name')}>
                  <span>Nama Desa Cantik {getSortIcon('name')}</span>
                </th>
                <th onClick={() => sortTable('address')}>
                  <span>Kecamatan {getSortIcon('address')}</span>
                </th>
                <th onClick={() => sortTable('area')}>
                  <span>Luas {getSortIcon('area')}</span>
                </th>
                <th><span>File Link</span></th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={index}>
                  <td>{item.no}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.area}</td>
                  <td><a href={item.pict} target="_blank" rel="noopener noreferrer">{item.pict}</a></td>
                  <td>
                    <button className={styles.actionButton} onClick={() => handleEditClick(item)}>
                      <FaEdit className={styles.addIcon} />
                    </button>
                    <button className={styles.actionButton}>
                      <FaTrash className={styles.addIcon} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        <div className={styles.pagination}>
          <button className={styles.pageButton} onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>«</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`${styles.pageButton} ${currentPage === i + 1 ? styles.activePageButton : ''}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button className={styles.pageButton} onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>»</button>
        </div>
        </div>
        </div>
      </main>
      <Modal show={showModal} onClose={handleCloseModal}>
        <form onSubmit={handleFormSubmit} className={styles.modalForm}>
          <h3 className='font-bold font-inter text-center text-[18px] text-[#c46024]'>
            {modalType === 'add' ? 'Tambah Desa' : 'Edit Desa'}
          </h3>
          <div className={styles.formGroup}>
            <label>No:</label>
            <input type="text" name="no" defaultValue={currentItem?.no || ''} required />
          </div>
          <div className={styles.formGroup}>
            <label>Nama Desa:</label>
            <input type="text" name="name" defaultValue={currentItem?.name || ''} required />
          </div>
          <div className={styles.formGroup}>
            <label>Kecamatan:</label>
            <select name="address" defaultValue={currentItem?.address || ''} required>
              <option value="" disabled>Pilih Kecamatan</option>
              {["Candi", "Gedangan", "Jabon", "Krembung", "Porong", "Prambon", "Sedati", "Sidoarjo", "Sukodono", "Taman", "Tanggulangin", "Tulangan", "Waru", "Wonoayu"].map((kecamatan, index) => (
                <option key={index} value={kecamatan}>{kecamatan}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Luas:</label>
            <input type="text" name="area" defaultValue={currentItem?.area || ''} required />
          </div>
          <div className={styles.formGroup}>
            <label>File Link:</label>
            <input type="url" name="pict" defaultValue={currentItem?.pict || ''} required />
          </div>
          <button type="submit" className={styles.submitButton}>Simpan</button>
        </form>
      </Modal>
    </div>
  );
};

export default Dashboard;
