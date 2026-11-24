
import { useState } from "react";
import "./SettingsPage.css";

function SettingsPage({ onThemeChange }) {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("dashflow-settings");

    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Use default settings if saved data is invalid
      }
    }

    return {
      name: "Mishree",
      email: "mishree@example.com",
      notifications: true,
      marketingEmails: false,
      theme: "Light",
    };
  });

  const [savedMessage, setSavedMessage] = useState("");

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    const updatedValue = type === "checkbox" ? checked : value;

    setSettings((prev) => ({
      ...prev,
      [name]: updatedValue,
    }));

    // Immediately update the global theme
    if (name === "theme" && onThemeChange) {
      onThemeChange(value);
    }

    setSavedMessage("");
  }

  function handleSave() {
    localStorage.setItem("dashflow-settings", JSON.stringify(settings));
    setSavedMessage("Settings saved successfully!");
  }

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>Manage your account and preferences.</p>
      </div>

      <div className="settings-card">
        <h2>Profile Information</h2>

        <div className="settings-form">
          <div className="settings-field">
            <label>Name</label>
            <input
              name="name"
              value={settings.name}
              onChange={handleChange}
            />
          </div>

          <div className="settings-field">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={settings.email}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="settings-card">
        <h2>Preferences</h2>

        <div className="settings-field">
          <label>Theme</label>

          <select
            name="theme"
            value={settings.theme}
            onChange={handleChange}
          >
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
            <option value="System">System Default</option>
          </select>
        </div>

        <div className="settings-toggle">
          <div>
            <strong>Email Notifications</strong>
            <p>Receive updates about your account.</p>
          </div>

          <input
            type="checkbox"
            name="notifications"
            checked={settings.notifications}
            onChange={handleChange}
          />
        </div>

        <div className="settings-toggle">
          <div>
            <strong>Marketing Emails</strong>
            <p>Receive product tips and announcements.</p>
          </div>

          <input
            type="checkbox"
            name="marketingEmails"
            checked={settings.marketingEmails}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="settings-card">
        <h2>Security</h2>

        <p className="settings-security-text">
          Your account security settings are currently managed
          locally in this demo.
        </p>
      </div>

      <div className="settings-actions">
        <button onClick={handleSave}>Save Changes</button>

        {savedMessage && (
          <p className="settings-success">{savedMessage}</p>
        )}
      </div>
    </div>
  );
}

export default SettingsPage;
