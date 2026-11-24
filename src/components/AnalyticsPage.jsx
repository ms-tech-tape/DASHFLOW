import { useState } from "react";

function AnalyticsPage() {
  const [period, setPeriod] = useState("30 Days");

  const analyticsData = {
    "7 Days": {
      revenue: "₹8,450",
      growth: "+8.4%",
      orders: "124",
      customers: "86",
      bars: [35, 55, 40, 75, 60, 90, 70],
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    "30 Days": {
      revenue: "₹24,500",
      growth: "+18.2%",
      orders: "438",
      customers: "312",
      bars: [40, 65, 50, 80, 45, 75, 95],
      labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7"],
    },
    "90 Days": {
      revenue: "₹76,800",
      growth: "+24.6%",
      orders: "1,284",
      customers: "892",
      bars: [55, 70, 45, 80, 65, 90, 100],
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
  };

  const data = analyticsData[period];

  const metrics = [
    {
      title: "Total Revenue",
      value: data.revenue,
      change: data.growth,
      icon: "₹",
      description: "Revenue generated",
    },
    {
      title: "Total Orders",
      value: data.orders,
      change: "+12.5%",
      icon: "↗",
      description: "Orders completed",
    },
    {
      title: "Customers",
      value: data.customers,
      change: "+9.3%",
      icon: "♙",
      description: "Active customers",
    },
    {
      title: "Conversion Rate",
      value: "4.8%",
      change: "+2.1%",
      icon: "◎",
      description: "Visitors converted",
    },
  ];

  return (
    <section className="page-section analytics-page">
      {/* Header */}
      <div className="page-heading analytics-heading">
        <div>
          <span className="page-eyebrow">BUSINESS INSIGHTS</span>
          <h2>Analytics Overview</h2>
          <p>Monitor performance and understand your business growth.</p>
        </div>

        <div className="analytics-period">
          {Object.keys(analyticsData).map((item) => (
            <button
              key={item}
              className={`period-btn ${period === item ? "selected" : ""}`}
              onClick={() => setPeriod(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics */}
      <div className="analytics-metrics">
        {metrics.map((metric, index) => (
          <div className="analytics-metric-card" key={metric.title}>
            <div className="analytics-metric-top">
              <span className={`analytics-icon analytics-icon-${index}`}>
                {metric.icon}
              </span>

              <span className="analytics-change">{metric.change}</span>
            </div>

            <p>{metric.title}</p>
            <h3>{metric.value}</h3>
            <small>{metric.description}</small>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="analytics-chart-card">
        <div className="analytics-chart-heading">
          <div>
            <span className="page-eyebrow">REVENUE PERFORMANCE</span>
            <h3>Revenue Trends</h3>
            <p>Revenue performance for {period.toLowerCase()}</p>
          </div>

          <div className="analytics-chart-legend">
            <span className="legend-dot"></span>
            Revenue
          </div>
        </div>

        <div className="analytics-chart">
          <div className="chart-grid-lines">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div className="analytics-bars">
            {data.bars.map((height, index) => (
              <div className="analytics-bar-wrapper" key={`${period}-${index}`}>
                <div
                  className="analytics-bar"
                  style={{ height: `${height}%` }}
                  title={`${data.labels[index]}: ${height}%`}
                ></div>

                <span>{data.labels[index]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="analytics-insights">
        <div className="analytics-insight-card">
          <div className="insight-icon">✦</div>
          <div>
            <h3>Revenue Growth</h3>
            <p>
              Your revenue is showing positive growth in the selected period.
              Keep tracking your performance to identify trends.
            </p>
          </div>
        </div>

        <div className="analytics-insight-card">
          <div className="insight-icon">♙</div>
          <div>
            <h3>Customer Activity</h3>
            <p>
              Monitor customer activity and orders to better understand
              your business performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AnalyticsPage;
