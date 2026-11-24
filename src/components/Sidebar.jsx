function Sidebar({ isOpen, onClose, activeTab, onNavigate }) {
  const menuItems = [
    { name: "Dashboard", icon: "⌂" },
    { name: "Analytics", icon: "▤" },
    { name: "Projects", icon: "▣" },
    { name: "Messages", icon: "✉" },
    { name: "Profile", icon: "👤" },
    { name: "Settings", icon: "⚙" },
  ];

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose}></div>
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <h2>DashFlow</h2>
          <button className="close-sidebar" onClick={onClose}>
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`sidebar-link ${
                activeTab === item.name ? "active" : ""
              }`}
              onClick={() => onNavigate(item.name)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-upgrade">
          <h4>Unlock more features</h4>
          <p>Make the most of your workspace.</p>
          <button className="upgrade-btn">Upgrade Plan</button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;