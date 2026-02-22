# Member Management System (MERN Stack)

A Basic Member Management Web Application built using:

- Backend: Node.js + Express
- Database: MongoDB Atlas
- Frontend: React
- Authentication: JWT
- Password Hashing: bcrypt

---

## 🚀 Features

### Authentication
- User Registration
- User Login
- JWT-based Authentication
- Protected Routes

### Member Management
- Add Member
- View Member List
- Edit Member
- Delete Member
- User-specific members (createdBy reference)

---

## 📁 Project Structure

```
member-management/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
└── frontend/
    ├── src/
    └── App.js
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

```bash
git clone <your-repo-link>
cd member-management
```

---

## 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file inside backend folder:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
PORT=5000
```

Start backend:

```bash
npm run dev
```

Server runs at:

```
http://localhost:5000
```

---

## 3️⃣ Frontend Setup

Open new terminal:

```bash
cd frontend
npm install
npm start
```

Frontend runs at:

```
http://localhost:3000
```

---

# 🔐 Environment Variables

| Variable | Description |
|----------|------------|
| MONGO_URI | MongoDB Atlas connection string |
| JWT_SECRET | Secret key for JWT signing |
| PORT | Backend server port |

---

# 📬 API Endpoints

### Auth Routes

POST `/api/auth/register`  
POST `/api/auth/login`

### Member Routes (Protected)

GET `/api/members`  
POST `/api/members`  
PUT `/api/members/:id`  
DELETE `/api/members/:id`

---


# 👨‍💻 Author

Vaibhav Patil  
MERN Stack Developer
