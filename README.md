
# DASHFLOW – Full Stack Dashboard Application

DASHFLOW is a dashboard application that started as a React frontend project and has been expanded with a backend powered by Node.js, Express.js, and PostgreSQL.

The project focuses on building a structured application with a React-based interface, RESTful APIs, and a relational database.

## 🚀 Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3

### Backend
- Node.js
- Express.js
- PostgreSQL
- RESTful APIs

### Tools
- Visual Studio Code
- Postman
- Git and GitHub

## ✨ Features

### Frontend
- Dashboard interface built with React.
- Responsive user interface.
- Interactive dashboard components.

### Backend
- Express.js server connected to PostgreSQL.
- Separate models, controllers, and routes.
- User management APIs.
- Product management APIs.
- Order management APIs.
- CRUD operations (Create, Read, Update, Delete).
- Input validation for user-related requests.
- Partial updates for order records.
- Centralized database connection configuration.

## 🗄️ Database Structure

The PostgreSQL database contains seven tables:

| Table | Purpose |
|---|---|
| users | User information |
| products | Product information |
| categories | Product categories |
| orders | Customer orders |
| order_items | Items associated with orders |
| carts | Shopping carts |
| cart_items | Products in shopping carts |

## 🔌 API Modules

### Users
- Create user
- Get all users
- Get user by ID
- Update user
- Delete user

### Products
- Create product
- Get all products
- Get product by ID
- Update product
- Delete product

### Orders
- Create order
- Get all orders
- Get order by ID
- Update order
- Delete order

## 🧪 API Testing

Postman was used to test the REST API endpoints, including:

- GET
- POST
- PUT
- DELETE

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/ms-tech-tape/DASHFLOW.git
cd DASHFLOW
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root.

Add your PostgreSQL configuration using the variable names expected by `config/db.js`.

Never commit your actual `.env` file.

### 4. Start the backend

```bash
node server.mjs
```

The backend runs on port 5000.

## 📂 Backend Project Structure

```text
DASHFLOW/
├── config/
│   └── db.js
├── controllers/
│   ├── userController.js
│   ├── productController.js
│   └── orderController.js
├── middleware/
│   └── userValidation.js
├── models/
│   ├── userModel.js
│   ├── productModel.js
│   └── orderModel.js
├── routes/
│   ├── userRoutes.js
│   ├── productRoutes.js
│   └── orderRoutes.js
├── server.mjs
├── package.json
└── README.md
```

## 🎯 Learning Outcomes

Through DASHFLOW, I have been exploring:

- React frontend development.
- Backend development with Node.js and Express.js.
- REST API design and implementation.
- PostgreSQL database integration.
- CRUD operations.
- API testing using Postman.
- Organizing backend code using models, controllers, and routes.

## 👩‍💻 Developer

**Mishree Savani**

GitHub: https://github.com/ms-tech-tape

---

