import React from 'react';
import { FaCross } from 'react-icons/fa';
import styles from './buletinModal.module.css';

const BuletinModal = ({ show, onClose, onSubmit, modalType, currentItem }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>&times;</button>
        <form onSubmit={onSubmit} className={styles.modalForm}>
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
      </div>
    </div>
  );
};

export default BuletinModal;
