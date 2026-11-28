
import { useEffect, useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import DashboardOverview from "./components/DashboardOverview";
import ProjectsPage from "./components/ProjectsPage";
import AnalyticsPage from "./components/AnalyticsPage";
import MessagesPage from "./components/MessagesPage";
import SettingsPage from "./components/SettingsPage";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Admin from "./components/Admin";

function getSavedAuth() {
  try {
    const saved = sessionStorage.getItem("dashflow-auth");

    if (!saved) return null;

    const auth = JSON.parse(saved);

    if (!auth.token || !auth.user || !auth.user.role) {
      sessionStorage.removeItem("dashflow-auth");
      return null;
    }

    const payload = JSON.parse(atob(auth.token.split(".")[1]));

    if (!payload.exp || payload.exp * 1000 <= Date.now()) {
      sessionStorage.removeItem("dashflow-auth");
      return null;
    }

    return auth;
  } catch {
    sessionStorage.removeItem("dashflow-auth");
    return null;
  }
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const [auth, setAuth] = useState(getSavedAuth);

  const [theme, setTheme] = useState(() => {
    try {
      const settings = JSON.parse(
        localStorage.getItem("dashflow-settings")
      );

      return settings?.theme || "light";
    } catch {
      return "light";
    }
  });

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Automatically log out when JWT expires
  useEffect(() => {
    if (!auth?.token) return;

    try {
      const payload = JSON.parse(atob(auth.token.split(".")[1]));
      const remainingTime = payload.exp * 1000 - Date.now();

      if (remainingTime <= 0) {
        handleLogout();
        return;
      }

      const timeout = setTimeout(handleLogout, remainingTime);

      return () => clearTimeout(timeout);
    } catch {
      handleLogout();
    }
  }, [auth]);

  function handleLogin(loginData) {
    sessionStorage.setItem(
      "dashflow-auth",
      JSON.stringify(loginData)
    );

    setAuth(loginData);
    setActiveTab("Dashboard");
  }

  function handleLogout() {
    sessionStorage.removeItem("dashflow-auth");

    setAuth(null);
    setActiveTab("Dashboard");
    setSearchQuery("");
    setIsSidebarOpen(false);
  }

  function handleNavigate(tab) {
    setActiveTab(tab);
    setIsSidebarOpen(false);
    setSearchQuery("");
  }

  function renderContent() {
    switch (activeTab) {
      case "Dashboard":
        return <DashboardOverview searchQuery={searchQuery} />;

      case "Analytics":
        return <AnalyticsPage />;

      case "Projects":
        return <ProjectsPage />;

      case "Messages":
        return <MessagesPage />;

      case "Profile":
        return <Profile user={auth.user} />;

      case "Settings":
        return <SettingsPage onThemeChange={setTheme} />;

      case "Admin":
        if (auth.user.role?.toLowerCase() !== "admin") {
        return <DashboardOverview searchQuery={searchQuery} />;
      }

        return <Admin token={auth.token} />;  

      default:
        return <DashboardOverview searchQuery={searchQuery} />;
    }
  }

  // Protect dashboard: login required
  if (!auth?.token || !auth?.user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="dashboard">

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        onNavigate={handleNavigate}
        user={auth.user}
      />

      <main className="main-content">

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "14px",
            padding: "12px 24px",
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: "13px" }}>
            {auth.user.first_name} {auth.user.last_name}
            {" · "}
            <strong style={{ color: "#641e36" }}>
              {auth.user.role.toUpperCase()}
            </strong>
          </span>

          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              border: "1px solid #641e36",
              borderRadius: "8px",
              background: "#641e36",
              color: "#ffffff",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Logout
          </button>
        </div>

        
        <Navbar
          onMenuClick={() => setIsSidebarOpen(true)}
          activeTab={activeTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          user={auth.user}
        />

        {renderContent()}

      </main>
    </div>
  );
}

export default App;
