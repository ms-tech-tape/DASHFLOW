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

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

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
        return <Profile />;

      case "Settings":
        return <SettingsPage onThemeChange={setTheme} />;

      default:
        return <DashboardOverview searchQuery={searchQuery} />;
    }
  }

  // Show Login page before entering the dashboard
  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="dashboard">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeTab={activeTab}
        onNavigate={handleNavigate}
      />

      <main className="main-content">
        <Navbar
          onMenuClick={() => setIsSidebarOpen(true)}
          activeTab={activeTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {renderContent()}
      </main>
    </div>
  );
}

export default App;