# Computer Literacy Learning Portal

A web-based learning platform designed to help students access computer literacy learning materials, study notes, and assignments. The platform also provides administrators with tools to manage students and learning resources.

## Project Overview

The Computer Literacy Learning Portal provides a centralized platform where students can access educational resources and continue learning at their own pace.

## Main Features

### Student Portal
- Student registration and login
- Student dashboard
- View enrolled subjects
- Access learning materials
- Download notes for offline study
- View and submit assignments
- Track learning progress
- Manage student profile

### Admin Portal
- Admin dashboard
- Manage students
- Manage subjects
- Upload and manage learning materials
- Manage assignments
- View reports
- Manage system settings

## Technologies Used

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## Project Structure

```text
computer-literacy-portal/
│
├── backend/
│   ├── src/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone git@github.com:Mudu-abdullahi/computer-literacy-portal.git
cd computer-literacy-portal
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file inside the backend folder and configure your environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local frontend URL displayed in your terminal.

## Security

- Authentication for protected routes
- Role-based access for administrators and students
- Environment variables for sensitive configuration

## Project Status

Under active development.

## Repository

GitHub: https://github.com/Mudu-abdullahi/computer-literacy-portal

## Author

**Mudu Abdullahi**

Computer Literacy Learning Portal
