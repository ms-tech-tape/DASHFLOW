import { useState } from "react";
import "./Profile.css";

const defaultProfile = {
  name: "Mishree Savani",
  email: "mishree@example.com",
  role: "Frontend Developer",
  phone: "+91 98765 43210",
  location: "Surat, India",
  bio: "Passionate about building modern and interactive web applications.",
};

function getSavedProfile() {
  try {
    const saved = localStorage.getItem("dashflow-profile");
    return saved ? JSON.parse(saved) : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

function Profile() {
  const [profile, setProfile] = useState(getSavedProfile);
  const [editData, setEditData] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const initials = profile.name
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleEdit() {
    setEditData(profile);
    setMessage("");
    setIsEditing(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSave(e) {
    e.preventDefault();

    if (!editData.name.trim() || !editData.email.trim()) {
      setMessage("Name and email are required.");
      return;
    }

    const updatedProfile = {
      ...editData,
      name: editData.name.trim(),
      email: editData.email.trim(),
    };

    setProfile(updatedProfile);
    localStorage.setItem(
      "dashflow-profile",
      JSON.stringify(updatedProfile)
    );

    setIsEditing(false);
    setMessage("Profile updated successfully!");
  }

  function handleCancel() {
    setEditData(profile);
    setIsEditing(false);
    setMessage("");
  }

  return (
    <div className="profile-page">
      <div className="profile-page-header">
        <div>
          <h1>My Profile</h1>
          <p>Manage your personal information.</p>
        </div>
      </div>

      <div className="profile-card">
        <div className="profile-top">
          <div className="profile-avatar">
            {initials || "U"}
          </div>

          <div className="profile-identity">
            <h2>{profile.name}</h2>
            <p>{profile.role}</p>
            <span>{profile.email}</span>
          </div>

          {!isEditing && (
            <button
              className="profile-edit-btn"
              onClick={handleEdit}
            >
              Edit Profile
            </button>
          )}
        </div>

        <div className="profile-divider"></div>

        {message && (
          <p className="profile-message">{message}</p>
        )}

        {isEditing ? (
          <form className="profile-form" onSubmit={handleSave}>
            <div className="profile-fields">

              <div className="profile-field">
                <label htmlFor="profile-name">Full Name</label>
                <input
                  id="profile-name"
                  name="name"
                  value={editData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="profile-field">
                <label htmlFor="profile-email">Email Address</label>
                <input
                  id="profile-email"
                  name="email"
                  type="email"
                  value={editData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="profile-field">
                <label htmlFor="profile-role">Role</label>
                <input
                  id="profile-role"
                  name="role"
                  value={editData.role}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-field">
                <label htmlFor="profile-phone">Phone Number</label>
                <input
                  id="profile-phone"
                  name="phone"
                  value={editData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-field">
                <label htmlFor="profile-location">Location</label>
                <input
                  id="profile-location"
                  name="location"
                  value={editData.location}
                  onChange={handleChange}
                />
              </div>

              <div className="profile-field profile-bio-field">
                <label htmlFor="profile-bio">Bio</label>
                <textarea
                  id="profile-bio"
                  name="bio"
                  rows="4"
                  value={editData.bio}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="profile-actions">
              <button
                type="button"
                className="profile-cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="profile-save-btn"
              >
                Save Changes
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-details">

            <div className="profile-detail">
              <span>Full Name</span>
              <p>{profile.name}</p>
            </div>

            <div className="profile-detail">
              <span>Email Address</span>
              <p>{profile.email}</p>
            </div>

            <div className="profile-detail">
              <span>Role</span>
              <p>{profile.role || "Not provided"}</p>
            </div>

            <div className="profile-detail">
              <span>Phone Number</span>
              <p>{profile.phone || "Not provided"}</p>
            </div>

            <div className="profile-detail">
              <span>Location</span>
              <p>{profile.location || "Not provided"}</p>
            </div>

            <div className="profile-detail profile-bio">
              <span>About Me</span>
              <p>{profile.bio || "No bio added yet."}</p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;