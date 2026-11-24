
import { useState } from "react";

const initialMessages = [
  {
    id: 1,
    sender: "Olivia Martin",
    email: "olivia@example.com",
    subject: "Project collaboration",
    preview: "Hi! I'd love to discuss a possible collaboration...",
    content:
      "Hi! I'd love to discuss a possible collaboration with you. I have been following your recent work and think there could be an interesting opportunity for us to work together. Let me know when you are available!",
    date: "Today",
    unread: true,
    avatar: "O",
  },
  {
    id: 2,
    sender: "Jackson Lee",
    email: "jackson@example.com",
    subject: "Dashboard feedback",
    preview: "I reviewed the dashboard design and have a few suggestions...",
    content:
      "Hello! I reviewed the dashboard design and have a few suggestions that may help improve the user experience. The overall layout looks promising. Let me know if you'd like me to share the detailed feedback.",
    date: "Yesterday",
    unread: true,
    avatar: "J",
  },
  {
    id: 3,
    sender: "Sophia Williams",
    email: "sophia@example.com",
    subject: "Monthly report",
    preview: "The monthly report is ready for your review...",
    content:
      "Hi! The monthly report is ready for your review. I've organized the key metrics, performance highlights and action items. Please take a look when you have time.",
    date: "20 Nov",
    unread: false,
    avatar: "S",
  },
  {
    id: 4,
    sender: "Noah Anderson",
    email: "noah@example.com",
    subject: "Meeting schedule",
    preview: "Can we schedule a meeting for next week?",
    content:
      "Hi! Can we schedule a meeting for next week to discuss the upcoming project milestones? I am flexible with timings, so let me know what works best for you.",
    date: "19 Nov",
    unread: false,
    avatar: "N",
  },
];

function MessagesPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [filter, setFilter] = useState("All");

  const unreadCount = messages.filter((message) => message.unread).length;

  const filteredMessages = messages.filter((message) => {
    if (filter === "Unread") return message.unread;
    return true;
  });

  const openMessage = (message) => {
    setSelectedMessage(message);

    setMessages((prev) =>
      prev.map((item) =>
        item.id === message.id ? { ...item, unread: false } : item
      )
    );
  };

  const deleteMessage = (id) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));

    if (selectedMessage?.id === id) {
      setSelectedMessage(null);
    }
  };

  return (
    <section className="page-section messages-page">
      <div className="page-heading">
        <span className="page-eyebrow">COMMUNICATION CENTER</span>
        <h2>Messages</h2>
        <p>Keep track of conversations and important updates.</p>
      </div>

      {/* Inbox summary */}
      <div className="message-summary">
        <div className="message-summary-card">
          <div className="message-summary-icon">✉</div>
          <div>
            <span>Total Messages</span>
            <h3>{messages.length}</h3>
          </div>
        </div>

        <div className="message-summary-card">
          <div className="message-summary-icon unread-summary-icon">●</div>
          <div>
            <span>Unread Messages</span>
            <h3>{unreadCount}</h3>
          </div>
        </div>
      </div>

      {/* Inbox */}
      <div className="inbox-card">
        <div className="inbox-header">
          <div>
            <h3>Your Inbox</h3>
            <p>Messages and conversations</p>
          </div>

          <div className="message-filters">
            {["All", "Unread"].map((item) => (
              <button
                key={item}
                className={`message-filter-btn ${
                  filter === item ? "selected" : ""
                }`}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {filteredMessages.length === 0 ? (
          <div className="messages-empty">
            <span>✉</span>
            <h3>No messages here</h3>
            <p>Your inbox is empty for this filter.</p>
          </div>
        ) : (
          <div className="message-list">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className={`message-item ${
                  message.unread ? "message-unread" : ""
                }`}
              >
                <button
                  className="message-main"
                  onClick={() => openMessage(message)}
                >
                  <div className="message-avatar">{message.avatar}</div>

                  <div className="message-body">
                    <div className="message-topline">
                      <strong>{message.sender}</strong>
                      <span className="message-date">{message.date}</span>
                    </div>

                    <h4>{message.subject}</h4>
                    <p>{message.preview}</p>
                  </div>

                  {message.unread && (
                    <span className="unread-dot" title="Unread"></span>
                  )}
                </button>

                <button
                  className="message-delete-btn"
                  onClick={() => deleteMessage(message.id)}
                  title="Delete message"
                  aria-label={`Delete message from ${message.sender}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message reader */}
      {selectedMessage && (
        <div className="message-reader">
          <div className="message-reader-header">
            <div>
              <span className="page-eyebrow">MESSAGE DETAILS</span>
              <h3>{selectedMessage.subject}</h3>
            </div>

            <button
              className="message-close-btn"
              onClick={() => setSelectedMessage(null)}
              aria-label="Close message"
            >
              ✕
            </button>
          </div>

          <div className="message-sender-details">
            <div className="message-avatar">
              {selectedMessage.avatar}
            </div>

            <div>
              <strong>{selectedMessage.sender}</strong>
              <span>{selectedMessage.email}</span>
            </div>
          </div>

          <p className="message-full-content">
            {selectedMessage.content}
          </p>

          <div className="message-reader-footer">
            <span>Received: {selectedMessage.date}</span>

            <button
              className="message-delete-reader-btn"
              onClick={() => deleteMessage(selectedMessage.id)}
            >
              Delete Message
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default MessagesPage;
