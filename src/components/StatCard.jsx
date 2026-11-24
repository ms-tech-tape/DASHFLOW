function StatCard({ title, value, change, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-card-top">
        <span className="stat-icon">{icon}</span>
        <span className="stat-change">{change}</span>
      </div>

      <p className="stat-title">{title}</p>
      <h3 className="stat-value">{value}</h3>
    </div>
  );
}

export default StatCard;