import React, { useState } from "react";
import "./Dashboard.css";
import NotificationPopup from "../../component/notification.jsx";
import NavbarAdmin from "../../component/NavbarAdmin.jsx";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("books");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");

  // Data contoh buku
  const [books, setBooks] = useState([
    {
      id: 1,
      title: "Atomic Habits",
      author: "James Clear",
      category: "Pengembangan Diri",
      price: "Rp 97.500",
      status: "Published",
    },
    {
      id: 2,
      title: "Filosofi Teras",
      author: "Henry Manampiring",
      category: "Filsafat",
      price: "Rp 85.000",
      status: "Draft",
    },
  ]);

  // Data contoh user
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

  // Form state untuk menambah buku
  const [bookForm, setBookForm] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    description: "",
    coverImage: null,
  });

  // Form state untuk mencari user
  const [searchUser, setSearchUser] = useState("");

  const showNotificationMessage = (message, type = "success") => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
  };

  const handleBookSubmit = (e) => {
    e.preventDefault();

    // Validasi form
    if (
      !bookForm.title ||
      !bookForm.author ||
      !bookForm.category ||
      !bookForm.price
    ) {
      showNotificationMessage("Harap isi semua field yang wajib!", "error");
      return;
    }

    // Tambahkan buku baru
    const newBook = {
      id: books.length + 1,
      title: bookForm.title,
      author: bookForm.author,
      category: bookForm.category,
      price: bookForm.price,
      status: "Draft",
    };

    setBooks([...books, newBook]);
    setBookForm({
      title: "",
      author: "",
      category: "",
      price: "",
      description: "",
      coverImage: null,
    });
    showNotificationMessage("Buku berhasil ditambahkan!");
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

  return (
    <div className='admin-dashboard'>
        <NavbarAdmin />

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
                  <h3>Admin User</h3>
                  <p>admin@tabba.com</p>
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
              {/* Dashboard Overview */}
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
                            value={bookForm.title}
                            onChange={(e) =>
                              setBookForm({
                                ...bookForm,
                                title: e.target.value,
                              })
                            }
                            placeholder='Masukkan judul buku'
                          />
                        </div>
                        <div className='form-group'>
                          <label>Penulis *</label>
                          <input
                            type='text'
                            value={bookForm.author}
                            onChange={(e) =>
                              setBookForm({
                                ...bookForm,
                                author: e.target.value,
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
                            value={bookForm.category}
                            onChange={(e) =>
                              setBookForm({
                                ...bookForm,
                                category: e.target.value,
                              })
                            }>
                            <option value=''>Pilih kategori</option>
                            <option value='Fiksi'>Fiksi</option>
                            <option value='Non-Fiksi'>Non-Fiksi</option>
                            <option value='Psikologi'>Psikologi</option>
                            <option value='Pengembangan Diri'>
                              Pengembangan Diri
                            </option>
                            <option value='Filsafat'>Filsafat</option>
                            <option value='Sejarah'>Sejarah</option>
                            <option value='Sains'>Sains</option>
                          </select>
                        </div>
                        <div className='form-group'>
                          <label>Harga *</label>
                          <input
                            type='text'
                            value={bookForm.price}
                            onChange={(e) =>
                              setBookForm({
                                ...bookForm,
                                price: e.target.value,
                              })
                            }
                            placeholder='Contoh: Rp 99.000'
                          />
                        </div>
                      </div>

                      <div className='form-group'>
                        <label>Deskripsi</label>
                        <textarea
                          rows='3'
                          value={bookForm.description}
                          onChange={(e) =>
                            setBookForm({
                              ...bookForm,
                              description: e.target.value,
                            })
                          }
                          placeholder='Deskripsi singkat tentang buku'
                        />
                      </div>

                      <div className='form-group'>
                        <label>Cover Buku</label>
                        <input
                          type='file'
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
                            <th>Harga</th>
                            <th>Status</th>
                            <th>Aksi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {books.map((book) => (
                            <tr key={book.id}>
                              <td>{book.title}</td>
                              <td>{book.author}</td>
                              <td>{book.category}</td>
                              <td>{book.price}</td>
                              <td>
                                <span
                                  className={`status-badge ${book.status.toLowerCase()}`}>
                                  {book.status}
                                </span>
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
                  <div className='settings-placeholder'>
                    <p>Pengaturan sistem akan ditampilkan di sini.</p>
                    <p>Konfigurasi website, theme, dan preferences di sini.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Notification Popup */}
      {showNotification && (
        <NotificationPopup
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
          duration={3000}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
