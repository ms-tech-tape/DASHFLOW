import StatCard from "./StatCard";
import RevenueChart from "./RevenueChart";
import TransactionTable from "./TransactionTable";
import APIUsers from "./APIUsers";

function DashboardOverview({ searchQuery }) {
  return (
    <section className="overview">
      <div className="welcome-section">
        <h2>Overview</h2>
        <p>Welcome back! Here's what's happening today.</p>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Revenue"
          value="$45,231"
          change="+12.5%"
          icon="💰"
        />

        <StatCard
          title="Total Users"
          value="2,450"
          change="+8.2%"
          icon="👥"
        />

        <StatCard
          title="Total Orders"
          value="1,284"
          change="+5.7%"
          icon="📦"
        />

        <StatCard
          title="Growth"
          value="24.8%"
          change="+4.3%"
          icon="📈"
        />
      </div>

      <APIUsers />
      <RevenueChart />

      <TransactionTable searchQuery={searchQuery} />
    </section>
  );
}
export default DashboardOverview;