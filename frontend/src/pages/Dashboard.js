import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    companyName: "",
    mobile: "",
    city: "",
    membershipType: "Basic",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/members");
      setMembers(res.data.data || []);
    } catch {
      setError("Failed to fetch members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      companyName: "",
      mobile: "",
      city: "",
      membershipType: "Basic",
    });
    setEditingId(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }

    try {
      setLoading(true);
      if (editingId) {
        // Update member
        await API.put(`/members/${editingId}`, form);
        setSuccess("Member updated successfully");
      } else {
        // Add new member
        await API.post("/members", form);
        setSuccess("Member added successfully");
      }
      resetForm();
      fetchMembers();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member) => {
    setForm({
      name: member.name,
      companyName: member.companyName,
      mobile: member.mobile,
      city: member.city,
      membershipType: member.membershipType,
    });
    setEditingId(member._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this member?")) {
      try {
        setLoading(true);
        await API.delete(`/members/${id}`);
        setSuccess("Member deleted successfully");
        fetchMembers();
      } catch (err) {
        setError(err.response?.data?.message || "Delete failed");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Member Management System</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </header>

      <main className="dashboard-content">
        {/* Form Section */}
        <div className="form-section">
          <h2>{editingId ? "Edit Member" : "Add New Member"}</h2>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit} className="member-form">
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                placeholder="Enter member name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Company Name</label>
              <input
                type="text"
                placeholder="Enter company name"
                value={form.companyName}
                onChange={(e) =>
                  setForm({ ...form, companyName: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Mobile</label>
              <input
                type="tel"
                placeholder="Enter mobile number"
                value={form.mobile}
                onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                placeholder="Enter city"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Membership Type</label>
              <select
                value={form.membershipType}
                onChange={(e) =>
                  setForm({ ...form, membershipType: e.target.value })
                }
              >
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="submit" disabled={loading} className="btn-primary">
                {loading
                  ? "Processing..."
                  : editingId
                    ? "Update Member"
                    : "Add Member"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="btn-secondary"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Members List Section */}
        <div className="members-section">
          <h2>Members List ({members.length})</h2>

          {loading && !members.length ? (
            <p className="loading">Loading members...</p>
          ) : members.length === 0 ? (
            <p className="no-data">No members found. Add your first member!</p>
          ) : (
            <div className="members-table-wrapper">
              <table className="members-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Company</th>
                    <th>Mobile</th>
                    <th>City</th>
                    <th>Membership Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member) => (
                    <tr key={member._id}>
                      <td>{member.name}</td>
                      <td>{member.companyName || "-"}</td>
                      <td>{member.mobile || "-"}</td>
                      <td>{member.city || "-"}</td>
                      <td>
                        <span
                          className={`badge badge-${member.membershipType.toLowerCase()}`}
                        >
                          {member.membershipType}
                        </span>
                      </td>
                      <td className="actions-cell">
                        <button
                          onClick={() => handleEdit(member)}
                          className="btn-edit"
                          disabled={loading}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(member._id)}
                          className="btn-delete"
                          disabled={loading}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
