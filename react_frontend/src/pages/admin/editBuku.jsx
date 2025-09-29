import React, { useState, useEffect } from 'react';
import './editBuku.css';

const EditBook = ({ book, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nama: '',
    penulis: '',
    kategori: '',
    rating: '',
    deskripsi: '',
    status: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  useEffect(() => {
    if (book) {
      setFormData({
        nama: book.nama || '',
        penulis: book.penulis || '',
        kategori: book.kategori || '',
        rating: book.rating || '',
        deskripsi: book.deskripsi || '',
        status: book.status || ''
      });
    }
  }, [book, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await onSave(book.id, formData);
      onClose();
    } catch (error) {
      console.error('Error updating book:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="edit-book-modal">
        <div className="modal-header">
          <h2>Edit Buku</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="nama">Judul Buku *</label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                required
                placeholder="Masukkan judul buku"
              />
            </div>

            <div className="form-group">
              <label htmlFor="penulis">Penulis *</label>
              <input
                type="text"
                id="penulis"
                name="penulis"
                value={formData.penulis}
                onChange={handleChange}
                required
                placeholder="Nama penulis"
              />
            </div>

            <div className="form-group">
              <label htmlFor="kategori">Kategori *</label>
              <select
                id="kategori"
                name="kategori"
                value={formData.kategori}
                onChange={handleChange}
                required
              >
                <option value="">Pilih kategori</option>
                <option value="Fiksi">Fiksi</option>
                <option value="Non-Fiksi">Non-Fiksi</option>
                <option value="Psikologi">Psikologi</option>
                <option value="Novel">Novel</option>
                <option value="Filsafat">Filsafat</option>
                <option value="Sejarah">Sejarah</option>
                <option value="Sains">Sains</option>
                <option value="Teknologi">Teknologi</option>
                <option value="Bisnis">Bisnis</option>
                <option value="Kesehatan">Kesehatan</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="rating">Harga *</label>
              <input
                type="text"
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
                placeholder="Contoh: Rp 99.000"
              />
            </div>

            <div className="form-group full-width">
              <label htmlFor="deskripsi">Deskripsi Buku</label>
              <textarea
                id="deskripsi"
                name="deskripsi"
                rows="4"
                value={formData.deskripsi}
                onChange={handleChange}
                placeholder="Deskripsi singkat tentang buku..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>
            </div>

            <div className="form-group">
              <label>Cover Buku</label>
              <div className="file-upload">
                <input
                  type="file"
                  id="coverImage"
                  accept="image/*"
                  className="file-input"
                />
                <label htmlFor="coverImage" className="file-label">
                  <span className="file-icon">📁</span>
                  <span>Unggah Cover Baru</span>
                </label>
              </div>
            </div>
          </div>

          {book?.coverImage && (
            <div className="current-cover">
              <label>Cover Saat Ini</label>
              <div className="cover-preview">
                <img 
                  src={book.coverImage} 
                  alt="Current cover" 
                  className="cover-image"
                />
                <span className="cover-text">Cover saat ini</span>
              </div>
            </div>
          )}

          <div className="modal-actions">
            <button
              type="button"
              className="btn-cancel"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn-save"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="button-spinner"></div>
                  Menyimpan...
                </>
              ) : (
                'Simpan Perubahan'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBook;