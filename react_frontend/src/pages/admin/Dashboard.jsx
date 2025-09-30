/** @format */

import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import NotificationPopup from "../../component/notification.jsx";
import Navbar from "../../component/Navbar.jsx";
import EditBook from "./editBuku.jsx";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [activeTab, setActiveTab] = useState("books");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [books, setBooks] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/books")
      .then((res) => res.json())
      .then((data) => {
        console.log("Books:", data);
        setBooks(data || []);
      })
      .catch((err) => console.error("Error fetch buku:", err));
  }, []);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Ahmad Sutisna",
      email: "ahmad@example.com",
      role: "user",
      joinDate: "2023-01-15",
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Wijaya",
      email: "sarah@example.com",
      role: "admin",
      joinDate: "2023-02-20",
      status: "active",
    },
    {
      id: 3,
      name: "Budi Santoso",
      email: "budi@example.com",
      role: "user",
      joinDate: "2023-03-10",
      status: "inactive",
    },
  ]);

  const [bookForm, setBookForm] = useState({
    nama: "",
    penulis: "",
    kategori: "",
    rating: "",
    deskripsi: "",
    status: "",
    coverImage: null,
  });

  const [searchUser, setSearchUser] = useState("");
  const [searchBooks, setSearchBooks] = useState("");

  const showNotificationMessage = (message, type = "success") => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
  };

  // Fungsi Logout
  const handleLogout = () => {
    console.log("Logging out...");

    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  const confirmLogout = () => {
    setShowLogoutConfirm(true);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  // tambah buku
  const handleBookSubmit = async (e) => {
    e.preventDefault();

    if (
      !bookForm.nama ||
      !bookForm.penulis ||
      !bookForm.kategori ||
      !bookForm.rating
    ) {
      showNotificationMessage("Harap isi semua field yang wajib!", "error");
      return;
    }

    try {
      const data = new FormData();
      data.append("nama", bookForm.nama);
      data.append("penulis", bookForm.penulis);
      data.append("kategori", bookForm.kategori);
      data.append("rating", bookForm.rating);
      data.append("status", bookForm.status || "Draft");
      data.append("deskripsi", bookForm.deskripsi);
      if (bookForm.coverImage) {
        data.append("coverImage", bookForm.coverImage);
      }

      const response = await fetch("http://127.0.0.1:8000/api/books", {
        method: "POST",
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setBooks([
          ...books,
          {
            id: result.name ? result.name.split("/").pop() : books.length + 1,
            nama: bookForm.nama,
            penulis: bookForm.penulis,
            kategori: bookForm.kategori,
            rating: bookForm.rating,
            deskripsi: bookForm.deskripsi,
            status: bookForm.status || "Draft",
            coverImage: result.fields?.coverImage?.stringValue || null,
          },
        ]);
        setBookForm({
          nama: "",
          penulis: "",
          kategori: "",
          rating: "",
          deskripsi: "",
          status: "Draft",
          coverImage: null,
        });
        document.getElementById("coverImageInput").value = "";
        showNotificationMessage("Buku berhasil ditambahkan!");
      } else {
        showNotificationMessage(
          result.error || "Gagal menambah buku!",
          "error"
        );
      }
    } catch (error) {
      console.error(error);
      showNotificationMessage("Terjadi kesalahan koneksi!", "error");
    }
  };

  const handleUserStatusChange = (userId, newStatus) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
    showNotificationMessage(`Status user berhasil diubah menjadi ${newStatus}`);
  };

  const handleUserRoleChange = (userId, newRole) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
    showNotificationMessage(`Role user berhasil diubah menjadi ${newRole}`);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
      user.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  const filteredBooks = books.filter(
    (book) =>
      book.nama.toLowerCase().includes(searchBooks.toLowerCase()) ||
      book.penulis.toLowerCase().includes(searchBooks.toLowerCase())
  );

  //hapus data buku
  const [deleteId, setDeleteId] = useState(null);

  const cancelDelete = () => {
    setDeleteId(null);
    setShowDeleteConfirm(false);
  };
  const proceedDelete = () => {
    if (deleteId) {
      handleDeleteBook(deleteId);
    }
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteBook = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/books/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (response.ok) {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        showNotificationMessage("Buku berhasil dihapus");
      } else {
        showNotificationMessage(result.error || "Gagal hapus buku", "error");
      }
    } catch (error) {
      console.error(error);
      showNotificationMessage("Terjadi kesalahan koneksi", "error");
    } finally {
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };

  //edit buku
  const [editModal, setEditModal] = useState({
    isOpen: false,
    book: null,
  });

  const handleEditBook = (book) => {
    setEditModal({
      isOpen: true,
      book: book,
    });
  };

  const handleCloseModal = () => {
    setEditModal({
      isOpen: false,
      book: null,
    });
  };

  // Update Book
  const handleSaveBook = async (id, updatedData) => {
    try {
      updatedData.append("_method", "PUT");

      const response = await fetch(`http://localhost:8000/api/books/${id}`, {
        method: "POST",
        body: updatedData,
      });

      const result = await response.json();

      if (response.ok) {
        setBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.id === id ? { ...book, ...result.data } : book
          )
        );
        showNotificationMessage("Buku berhasil diperbarui");
      } else {
        showNotificationMessage(result.error || "Gagal update buku", "error");
      }
    } catch (error) {
      console.error(error);
      showNotificationMessage("Terjadi kesalahan koneksi", "error");
    }
  };

  return (
    <div className='admin-dashboard'>
      <Navbar />

      {/* Main Content */}
      <main className='admin-main'>
        <div className='container'>
          <div className='admin-content'>
            {/* Sidebar */}
            <aside className='admin-sidebar'>
              <div className='admin-profile'>
                <div className='profile-image'>
                  <img
                    src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80'
                    alt='Admin Profile'
                  />
                </div>
                <div className='profile-info'>
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                </div>
              </div>

              <nav className='sidebar-nav'>
                <button
                  className={activeTab === "books" ? "active" : ""}
                  onClick={() => setActiveTab("books")}>
                  📚 Kelola Buku
                </button>
                <button
                  className={activeTab === "users" ? "active" : ""}
                  onClick={() => setActiveTab("users")}>
                  👥 Kelola User
                </button>
                <button
                  className={activeTab === "stats" ? "active" : ""}
                  onClick={() => setActiveTab("stats")}>
                  📊 Statistik
                </button>
                <button
                  className={activeTab === "settings" ? "active" : ""}
                  onClick={() => setActiveTab("settings")}>
                  ⚙️ Pengaturan
                </button>
              </nav>
            </aside>

            {/* Main Content Area */}
            <div className='admin-main-content'>
              {/* Dashboard Overview (tetap sama) */}
              <div className='dashboard-overview'>
                <div className='overview-card'>
                  <div className='card-icon'>📚</div>
                  <div className='card-info'>
                    <h3>{books.length}</h3>
                    <p>Total Buku</p>
                  </div>
                </div>
                <div className='overview-card'>
                  <div className='card-icon'>👥</div>
                  <div className='card-info'>
                    <h3>{users.length}</h3>
                    <p>Total User</p>
                  </div>
                </div>
                <div className='overview-card'>
                  <div className='card-icon'>✅</div>
                  <div className='card-info'>
                    <h3>
                      {
                        books.filter((book) => book.status === "Published")
                          .length
                      }
                    </h3>
                    <p>Buku Published</p>
                  </div>
                </div>
                <div className='overview-card'>
                  <div className='card-icon'>👑</div>
                  <div className='card-info'>
                    <h3>
                      {users.filter((user) => user.role === "admin").length}
                    </h3>
                    <p>Admin Users</p>
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              {activeTab === "books" && (
                <div className='tab-content'>
                  <h2>Kelola Buku</h2>

                  {/* Form Tambah Buku */}
                  <div className='add-book-form'>
                    <h3>Tambah Buku Baru</h3>
                    <form onSubmit={handleBookSubmit}>
                      <div className='form-row'>
                        <div className='form-group'>
                          <label>Judul Buku *</label>
                          <input
                            type='text'
                            value={bookForm.nama}
                            onChange={(e) =>
                              setBookForm({
                                ...bookForm,
                                nama: e.target.value,
                              })
                            }
                            placeholder='Masukkan judul buku'
                          />
                        </div>
                        <div className='form-group'>
                          <label>Penulis *</label>
                          <input
                            type='text'
                            value={bookForm.penulis}
                            onChange={(e) =>
                              setBookForm({
                                ...bookForm,
                                penulis: e.target.value,
                              })
                            }
                            placeholder='Nama penulis'
                          />
                        </div>
                      </div>

                      <div className='form-row'>
                        <div className='form-group'>
                          <label>Kategori *</label>
                          <select
                            value={bookForm.kategori}
                            onChange={(e) =>
                              setBookForm({
                                ...bookForm,
                                kategori: e.target.value,
                              })
                            }>
                            <option value=''>Pilih kategori</option>
                            <option value='Fiksi'>Fiksi</option>
                            <option value='Non-Fiksi'>Non-Fiksi</option>
                            <option value='Psikologi'>Psikologi</option>
                            <option value='Novel'>Novel</option>
                            <option value='Filsafat'>Filsafat</option>
                            <option value='Sejarah'>Sejarah</option>
                            <option value='Sains'>Sains</option>
                          </select>
                        </div>
                        <div className='form-group'>
                          <label>Rating *</label>
                          <input
                            type='text'
                            value={bookForm.rating}
                            onChange={(e) =>
                              setBookForm({
                                ...bookForm,
                                rating: e.target.value,
                              })
                            }
                            placeholder='Contoh: 4.8'
                          />
                        </div>
                      </div>

                      <div className='form-group'>
                        <label>Deskripsi</label>
                        <textarea
                          rows='3'
                          value={bookForm.deskripsi}
                          onChange={(e) =>
                            setBookForm({
                              ...bookForm,
                              deskripsi: e.target.value,
                            })
                          }
                          placeholder='Deskripsi singkat tentang buku'
                        />
                      </div>

                      <div className='form-group'>
                        <label>Cover Buku</label>
                        <input
                          type='file'
                          id='coverImageInput'
                          onChange={(e) =>
                            setBookForm({
                              ...bookForm,
                              coverImage: e.target.files[0],
                            })
                          }
                          accept='image/*'
                        />
                      </div>

                      <button type='submit' className='submit-btn'>
                        Tambah Buku
                      </button>
                    </form>
                  </div>

                  {/* Search Bar */}
                  <div className='search-bar'>
                    <input
                      type='text'
                      placeholder='Cari buku berdasarkan nama atau penulis...'
                      value={searchBooks}
                      onChange={(e) => setSearchBooks(e.target.value)}
                    />
                    <span className='search-icon'>🔍</span>
                  </div>

                  {/* Daftar Buku */}
                  <div className='books-list'>
                    <h3>Daftar Buku</h3>
                    <div className='table-container'>
                      <table className='admin-table'>
                        <thead>
                          <tr>
                            <th>Judul</th>
                            <th>Penulis</th>
                            <th>Kategori</th>
                            <th>Rating</th>
                            <th>Status</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredBooks.map((book) => (
                            <tr key={book.id}>
                              <td>{book.nama}</td>
                              <td>{book.penulis}</td>
                              <td>{book.kategori}</td>
                              <td>{book.rating}</td>
                              <td>
                                <span className={`status-badge ${book.status}`}>
                                  {book.status}
                                </span>
                              </td>
                              <td>
                                <div className='action-buttons'>
                                  <button
                                    className='btn-edit'
                                    onClick={() => handleEditBook(book)}>
                                    Edit
                                  </button>
                                  <button
                                    className='btn-delete'
                                    onClick={() => confirmDelete(book.id)}>
                                    Hapus
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "users" && (
                <div className='tab-content'>
                  <h2>Kelola User</h2>

                  {/* Search Bar */}
                  <div className='search-bar'>
                    <input
                      type='text'
                      placeholder='Cari user berdasarkan nama atau email...'
                      value={searchUser}
                      onChange={(e) => setSearchUser(e.target.value)}
                    />
                    <span className='search-icon'>🔍</span>
                  </div>

                  {/* Daftar User */}
                  <div className='table-container'>
                    <table className='admin-table'>
                      <thead>
                        <tr>
                          <th>Nama</th>
                          <th>Email</th>
                          <th>Role</th>
                          <th>Tanggal Bergabung</th>
                          <th>Status</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user) => (
                          <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                              <select
                                value={user.role}
                                onChange={(e) =>
                                  handleUserRoleChange(user.id, e.target.value)
                                }
                                className='role-select'>
                                <option value='user'>User</option>
                                <option value='admin'>Admin</option>
                              </select>
                            </td>
                            <td>{user.joinDate}</td>
                            <td>
                              <select
                                value={user.status}
                                onChange={(e) =>
                                  handleUserStatusChange(
                                    user.id,
                                    e.target.value
                                  )
                                }
                                className='status-select'>
                                <option value='active'>Active</option>
                                <option value='inactive'>Inactive</option>
                              </select>
                            </td>
                            <td>
                              <div className='action-buttons'>
                                <button className='btn-edit'>Edit</button>
                                <button className='btn-delete'>Hapus</button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === "stats" && (
                <div className='tab-content'>
                  <h2>Statistik Dashboard</h2>
                  <div className='stats-placeholder'>
                    <p>Dashboard statistik akan ditampilkan di sini.</p>
                    <p>Grafik, charts, dan analytics akan tersedia di sini.</p>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className='tab-content'>
                  <h2>Pengaturan Sistem</h2>

                  <div className='settings-section'>
                    <h3>Akun & Keamanan</h3>
                    <div className='settings-grid'>
                      <div className='setting-item'>
                        <div className='setting-info'>
                          <h4>Informasi Profil</h4>
                          <p>
                            Kelola informasi profil dan preferensi akun Anda
                          </p>
                        </div>
                        <button className='btn-edit'>Edit Profil</button>
                      </div>

                      <div className='setting-item'>
                        <div className='setting-info'>
                          <h4>Ubah Password</h4>
                          <p>Perbarui password akun Anda secara berkala</p>
                        </div>
                        <button className='btn-edit'>Ubah Password</button>
                      </div>
                    </div>
                  </div>

                  <div className='settings-section'>
                    <h3>Pengaturan Sistem</h3>
                    <div className='settings-grid'>
                      <div className='setting-item'>
                        <div className='setting-info'>
                          <h4>Tema Aplikasi</h4>
                          <p>Pilih tema terang atau gelap untuk dashboard</p>
                        </div>
                        <select className='theme-select'>
                          <option value='light'>Tema Terang</option>
                          <option value='dark'>Tema Gelap</option>
                          <option value='auto'>Sesuai Sistem</option>
                        </select>
                      </div>

                      <div className='setting-item'>
                        <div className='setting-info'>
                          <h4>Notifikasi</h4>
                          <p>Kelola preferensi notifikasi email dan push</p>
                        </div>
                        <button className='btn-edit'>Kelola Notifikasi</button>
                      </div>
                    </div>
                  </div>

                  <div className='settings-section danger-zone'>
                    <h3>Zona Berbahaya</h3>
                    <div className='danger-actions'>
                      <div className='danger-item'>
                        <div className='danger-info'>
                          <h4>Logout dari Sistem</h4>
                          <p>
                            Keluar dari dashboard admin dan kembali ke halaman
                            login
                          </p>
                        </div>
                        <button className='btn-logout' onClick={confirmLogout}>
                          Logout Sekarang
                        </button>
                      </div>

                      <div className='danger-item'>
                        <div className='danger-info'>
                          <h4>Hapus Akun</h4>
                          <p>Hapus permanen akun admin Anda dari sistem</p>
                        </div>
                        <button className='btn-delete-account' disabled>
                          Hapus Akun
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Edit Buku */}
      <EditBook
        book={editModal.book}
        isOpen={editModal.isOpen}
        onClose={handleCloseModal}
        onSave={handleSaveBook}
      />

      {/* Notification Popup */}
      {showNotification && (
        <NotificationPopup
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
          duration={3000}
        />
      )}

      {/* Logout Popup */}
      {showLogoutConfirm && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h3>Konfirmasi Logout</h3>
              <button className='modal-close' onClick={cancelLogout}>
                ×
              </button>
            </div>
            <div className='modal-body'>
              <p>Apakah Anda yakin ingin logout dari dashboard admin?</p>
              <div className='modal-warning'>
                <span>⚠️</span>
                <span>Anda perlu login kembali untuk mengakses dashboard.</span>
              </div>
            </div>
            <div className='modal-footer'>
              <button className='btn-cancel' onClick={cancelLogout}>
                Batal
              </button>
              <button className='btn-confirm-logout' onClick={handleLogout}>
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hapus data buku Popup */}
      {showDeleteConfirm && (
        <div className='modal-overlay'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h3>Konfirmasi Hapus Buku</h3>
              <button className='modal-close' onClick={cancelDelete}>
                ×
              </button>
            </div>
            <div className='modal-body'>
              <p>Apakah Anda yakin ingin menghapus buku ini?</p>
              <div className='modal-warning'>
                <span>🗑️</span>
                <span>
                  Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak
                  dapat dibatalkan.
                </span>
              </div>
            </div>
            <div className='modal-footer'>
              <button className='btn-cancel' onClick={cancelDelete}>
                Batal
              </button>
              <button className='btn-confirm-logout' onClick={proceedDelete}>
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
