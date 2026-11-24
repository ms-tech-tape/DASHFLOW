
function Navbar({ onMenuClick, activeTab, searchQuery, onSearchChange }) {
  return (
    <nav className="navbar">
      {/* Left Section */}
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

      {/* Right Section */}
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
              ✕
            </button>
          )}
        </div>

        {/* Profile */}
        <div className="profile">
          <div className="profile-avatar">M</div>

          <div className="profile-info">
            <span className="profile-name">Mishree</span>
            <span className="profile-role">Administrator</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
