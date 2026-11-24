import { useEffect, useState } from "react";
import { getUsers } from "../api/users";
import "./APIUsers.css";

function APIUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadUsers() {
    setLoading(true);
    setError("");

    try {
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  if (loading) {
    return <p className="api-message">Loading users...</p>;
  }

  if (error) {
    return (
      <div className="api-message">
        <p>{error}</p>
        <button onClick={loadUsers}>Try Again</button>
      </div>
    );
  }

  return (
    <section className="api-users">
      <div className="api-users-header">
        <div>
          <h2>Team Members</h2>
          <p>Users fetched directly from the API</p>
        </div>

        <button onClick={loadUsers} className="api-refresh-btn">
          ↻ Refresh
        </button>
      </div>

      <div className="api-users-grid">
        {users.map((user) => (
          <div className="api-user-card" key={user.id}>
            <div className="api-user-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div className="api-user-info">
              <h3>{user.name}</h3>
              <p>@{user.username}</p>
              <span>{user.email}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default APIUsers;