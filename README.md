# DASHFLOW – Project Management Dashboard

DASHFLOW is a full-stack project management dashboard built with React, Node.js, Express.js, and PostgreSQL.

It provides a dashboard interface for managing projects and displaying analytics, along with a backend REST API for handling users, products, and orders.

The application also includes user authentication, JWT-based authorization, and role-based access control for regular users and administrators.

## 🚀 Features

### Frontend
- Responsive dashboard interface.
- React-based component architecture.
- Dashboard overview and analytics.
- Project management interface.
- Messages and settings pages.
- Profile management.
- Data visualization using Recharts.
- Client-side navigation using React Router.

### Backend
- RESTful APIs using Node.js and Express.js.
- PostgreSQL database integration.
- User, product, and order management.
- Modular backend architecture using routes, controllers, and models.
- Request validation using Express Validator.
- Centralized authentication and role middleware.

### Authentication & Authorization
- User registration and login.
- Password hashing using bcrypt.
- JWT-based authentication.
- Protected API routes.
- User and Admin role-based access control (RBAC).
- Protected dashboard and admin access.

### Database
- PostgreSQL integration using the `pg` package.
- Database connection pooling.
- Relational database structure.
- Tables for users, products, categories, orders, order items, carts, and cart items.

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React.js, JavaScript, HTML5, CSS3 |
| Routing | React Router |
| Charts | Recharts |
| Build Tool | Vite |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| Database Driver | node-postgres (`pg`) |
| Authentication | JSON Web Token (JWT), bcrypt |
| Validation | Express Validator |
| Middleware | CORS, Express Middleware |
| Environment Variables | dotenv |
| Code Quality | Oxlint |
| Version Control | Git & GitHub |

## 📂 Project Structure

```text
DASHFLOW/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── adminController.js
│   ├── orderController.js
│   ├── productController.js
│   └── userController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── userValidation.js
│
├── models/
│   ├── orderModel.js
│   ├── productModel.js
│   └── userModel.js
│
├── routes/
│   ├── adminRoutes.js
│   ├── orderRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
│
├── public/
│
├── src/
│   ├── api/
│   │   └── users.js
│   │
│   ├── components/
│   │   ├── Admin.jsx
│   │   ├── AnalyticsPage.jsx
│   │   ├── DashboardOverview.jsx
│   │   ├── Login.jsx
│   │   ├── MessagesPage.jsx
│   │   ├── Navbar.jsx
│   │   ├── Profile.jsx
│   │   ├── ProjectsPage.jsx
│   │   ├── SettingsPage.jsx
│   │   ├── Sidebar.jsx
│   │   └── ...
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── server.mjs
├── package.json
├── package-lock.json
├── vite.config.js
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

Follow these steps to run DASHFLOW locally.

### 1. Clone the Repository

```bash
git clone https://github.com/ms-tech-tape/DASHFLOW.git
```

### 2. Navigate to the Project Directory

```bash
cd DASHFLOW
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project's root directory.

Add your PostgreSQL database configuration:

```env
DB_USER=your_postgres_username
DB_HOST=localhost
DB_NAME=your_database_name
DB_PASSWORD=your_database_password
DB_PORT=5432
```

Replace the example values with your own PostgreSQL configuration.

**Important:** Never commit your `.env` file or expose your database credentials, JWT secrets, or other sensitive information.

### 5. Start the Backend Server

Open a terminal in the project directory:

```bash
npm run server
```

The backend runs on:

```text
http://localhost:5000
```

### 6. Start the Frontend

Open a second terminal in the project directory:

```bash
npm run dev
```

Vite starts the frontend, normally at:

```text
http://localhost:5173
```

Open the displayed local URL in your browser.

## 🔗 Backend API Overview

The backend exposes the following API route groups:

| Route | Description |
|---|---|
| `/api/users` | User-related operations and authentication |
| `/api/products` | Product management |
| `/api/orders` | Order management |
| `/api/admin` | Administrator-related operations |
| `/test-db` | PostgreSQL connection test |

The backend supports standard HTTP methods, including:

- GET
- POST
- PUT
- PATCH
- DELETE

Protected routes use authentication and authorization middleware where required.

## 🔐 Security Implementation

DASHFLOW includes several backend security mechanisms:

- Password hashing using bcrypt.
- JWT-based user authentication.
- Authentication middleware for protected routes.
- Role-based authorization for User and Admin access.
- Request validation using Express Validator.
- CORS configuration for frontend-backend communication.
- Environment variables for database configuration.

## 🗄️ Database

DASHFLOW uses PostgreSQL as its relational database.

The database includes the following tables:

| Table | Purpose |
|---|---|
| users | Stores user information |
| products | Stores product information |
| categories | Organizes products into categories |
| orders | Stores order information |
| order_items | Stores individual items within orders |
| carts | Stores shopping cart information |
| cart_items | Stores individual cart items |

The backend uses PostgreSQL connection pooling through the `pg` package.

## 🧪 Testing & Development

The project includes API testing and backend functionality checks.

Useful commands:

| Command | Purpose |
|---|---|
| `npm run dev` | Start the frontend development server |
| `npm run server` | Start the backend server |
| `npm run build` | Build the frontend for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run Oxlint |

The backend database connection can also be checked using:

```text
GET http://localhost:5000/test-db
```

## 📚 Learning Outcomes

Through DASHFLOW, I have worked on:

- Building a React application using reusable components.
- Managing frontend navigation and application structure.
- Developing REST APIs using Express.js.
- Connecting a Node.js backend to PostgreSQL.
- Implementing CRUD operations.
- Understanding relational database design.
- Implementing authentication using JWT.
- Hashing passwords securely using bcrypt.
- Implementing role-based access control.
- Working with middleware and request validation.
- Testing API endpoints and debugging backend issues.

## 👩‍💻 Developer

**Developed by:** Mishree Savani

**GitHub:** [ms-tech-tape](https://github.com/ms-tech-tape)

**Project Repository:** [DASHFLOW](https://github.com/ms-tech-tape/DASHFLOW)

---
