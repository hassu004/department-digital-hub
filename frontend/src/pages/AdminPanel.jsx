
import { useEffect, useState } from "react";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token");

  // Get all users
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUsers(data);
      } else {
        setMessage(data.message || "Failed to load users");
      }

      setLoading(false);

    } catch (error) {
      console.error(error);
      setMessage("Cannot connect to server");
      setLoading(false);
    }
  };


  // Change user role
  const changeRole = async (userId, newRole) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${userId}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            role: newRole
          })
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Role updated successfully!");

        fetchUsers();
      } else {
        setMessage(data.message || "Failed to update role");
      }

    } catch (error) {
      console.error(error);
      setMessage("Cannot connect to server");
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);


  if (loading) {
    return <h2>Loading users...</h2>;
  }


  return (
    <section className="admin-panel">

      <h1>Admin Panel</h1>

      <p>
        Manage department users and their roles.
      </p>

      {message && <p>{message}</p>}


      <div className="users-container">

        {users.map((user) => (

          <div className="user-card" key={user._id}>

            <h3>{user.name}</h3>

            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <p>
              <strong>Current Role:</strong> {user.role}
            </p>


            <label>
              Change Role:
            </label>

            <select
              value={user.role}
              onChange={(e) =>
                changeRole(
                  user._id,
                  e.target.value
                )
              }
            >
              <option value="student">
                Student
              </option>

              <option value="faculty">
                Faculty
              </option>

              <option value="admin">
                Admin
              </option>

            </select>

          </div>

        ))}

      </div>

    </section>
  );
}

export default AdminPanel;
