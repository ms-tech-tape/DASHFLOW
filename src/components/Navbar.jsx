
function Navbar({
  onMenuClick,
  activeTab,
  searchQuery,
  onSearchChange,
  user,
}) {
  const firstName = user?.first_name || "User";
  const lastName = user?.last_name || "";
  const fullName = `${firstName} ${lastName}`.trim();

  const role =
    user?.role?.toLowerCase() === "admin"
      ? "Administrator"
      : "User";

  const initials = `${firstName[0] || "U"}${lastName[0] || ""}`.toUpperCase();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button
          className="menu-btn"
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          title="Open menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className="navbar-title">
          <h1>{activeTab}</h1>
          <p>DashFlow / {activeTab}</p>
        </div>
      </div>

      <div className="navbar-right">
        <div className="search-wrapper">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search transactions..."
            className="search-box"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />

          {searchQuery && (
            <button
              className="clear-search"
              onClick={() => onSearchChange("")}
              title="Clear search"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className="profile">
          <div className="profile-avatar">{initials}</div>

          <div className="profile-info">
            <span className="profile-name">{fullName}</span>
            <span className="profile-role">{role}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
