import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";


function manajemenAdmin() {
    const [users, setUsers] = useState([]);


    //fetch data users
    const fetchUsers = async () => {
        const userCollection = collection(db, "users");
        const snapshot = await getDocs(userCollection);
        setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    useEffect(() => {
        fetchUsers(); 
    }, []);

    //hapus users
    const handleDelete = async (id) => {
        if (window.confirm("Apakah yakin menghapus users ini?")) {
            await deleteDoc(doc(db, "users", id ));
            fetchUsers(); //refresh data setelah di hapus
        }
    };

    return (
      <div className="dashboard-users">
  <h2>Data Pengguna</h2>
  {users.length === 0 ? (
    <p className="no-users">Belum ada pengguna.</p>
  ) : (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            
            <th>Email</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              
              <td>{user.email}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

    );
}

export default manajemenAdmin;