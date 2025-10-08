/** @format */

import React, { useEffect, useState } from "react";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const userList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        console.log("User List:", userList);
        setUsers(userList);
      } else {
        setUsers([]);
      }
    });
  }, []);

  return (
    <div>
      <h2>Kelola User</h2>
      <table>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Email</th>
            <th>Role</th>
            <th>Tanggal Bergabung</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.joinDate || "-"}</td>
                <td>{u.status || "Active"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5'>Tidak ada data user</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
