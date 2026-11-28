
import { useEffect, useState } from "react";

function Admin({ token }) {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchAdminDashboard() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/dashboard",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            signal: controller.signal,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Unable to access admin dashboard."
          );
        }

        setAdminData(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchAdminDashboard();

    return () => controller.abort();
  }, [token]);

  if (loading) return <h2>Loading Admin Dashboard...</h2>;

  if (error) {
    return <h2 style={{ color: "red" }}>{error}</h2>;
  }

  return (
    <div style={{ padding: "24px" }}>
      <h1>Admin Dashboard</h1>

      <p>
        Welcome to the DASHFLOW Admin Panel!
      </p>

      <div
        style={{
          padding: "24px",
          marginTop: "20px",
          borderRadius: "12px",
          background: "var(--card-bg, #ffffff)",
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >
        <h2>Admin Access Verified</h2>

        <p>
          <strong>Message:</strong> {adminData.message}
        </p>

        <p>
          <strong>Role:</strong>{" "}
          {adminData.user.role.toUpperCase()}
        </p>

        <p>
          <strong>User ID:</strong> {adminData.user.id}
        </p>
      </div>
    </div>
  );
}

export default Admin;
