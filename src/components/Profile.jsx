
import { useState } from "react";
import "./Profile.css";

function getSavedProfile() {
  try {
    const saved = localStorage.getItem("dashflow-profile");

    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Use default optional profile details.
  }

  return {
    phone: "",
    location: "",
    bio: "",
  };
}

function Profile({ user }) {
  const [profile, setProfile] = useState(getSavedProfile);
  const [editData, setEditData] = useState(profile);
  const [isEditing, setIsEditing] = useState(false);
  const [message, setMessage] = useState("");

  const firstName = user?.first_name || "User";
  const lastName = user?.last_name || "";
  const fullName = `${firstName} ${lastName}`.trim();
  const email = user?.email || "Not provided";

  const role =
    user?.role?.toLowerCase() === "admin"
      ? "Administrator"
      : "User";

  const initials = `${firstName[0] || "U"}${lastName[0] || ""}`
    .toUpperCase();

  function handleEdit() {
    setEditData({ ...profile });
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

    const updatedProfile = {
      phone: editData.phone.trim(),
      location: editData.location.trim(),
      bio: editData.bio.trim(),
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
    setEditData({ ...profile });
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
            {initials}
          </div>

          <div className="profile-identity">
            <h2>{fullName}</h2>
            <p>{role}</p>
            <span>{email}</span>
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
                <label>Full Name</label>
                <input value={fullName} disabled />
              </div>

              <div className="profile-field">
                <label>Email Address</label>
                <input value={email} disabled />
              </div>

              <div className="profile-field">
                <label>Account Role</label>
                <input value={role} disabled />
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
              <p>{fullName}</p>
            </div>

            <div className="profile-detail">
              <span>Email Address</span>
              <p>{email}</p>
            </div>

            <div className="profile-detail">
              <span>Account Role</span>
              <p>{role}</p>
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
