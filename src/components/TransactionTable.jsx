function TransactionTable({ searchQuery = "" }) {
  const transactions = [
    {
      id: 1,
      name: "Olivia Martin",
      email: "olivia@example.com",
      amount: "$1,999.00",
      date: "20 Nov 2026",
      status: "Completed",
    },
    {
      id: 2,
      name: "Jackson Lee",
      email: "jackson@example.com",
      amount: "$39.00",
      date: "19 Nov 2026",
      status: "Pending",
    },
    {
      id: 3,
      name: "Isabella Chen",
      email: "isabella@example.com",
      amount: "$299.00",
      date: "18 Nov 2026",
      status: "Completed",
    },
    {
      id: 4,
      name: "William Kim",
      email: "william@example.com",
      amount: "$99.00",
      date: "17 Nov 2026",
      status: "Cancelled",
    },
    {
      id: 5,
      name: "Sofia Davis",
      email: "sofia@example.com",
      amount: "$499.00",
      date: "16 Nov 2026",
      status: "Completed",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const query = searchQuery.toLowerCase().trim();

    return (
      transaction.name.toLowerCase().includes(query) ||
      transaction.email.toLowerCase().includes(query) ||
      transaction.amount.toLowerCase().includes(query) ||
      transaction.date.toLowerCase().includes(query) ||
      transaction.status.toLowerCase().includes(query)
    );
  });

  return (
    <div className="transaction-card">
      <div className="transaction-header">
        <div>
          <h3>Recent Transactions</h3>
          <p>Latest transactions from your customers.</p>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>
                    <div className="customer-info">
                      <strong>{transaction.name}</strong>
                      <span>{transaction.email}</span>
                    </div>
                  </td>

                  <td>{transaction.date}</td>

                  <td className="amount">{transaction.amount}</td>

                  <td>
                    <span
                      className={`status ${transaction.status.toLowerCase()}`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="no-results">
                  No transactions found for "{searchQuery}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="transaction-count">
        Showing {filteredTransactions.length} of {transactions.length} transactions
      </div>
    </div>
  );
}

export default TransactionTable;