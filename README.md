# Circuit – Task Management Dashboard

Circuit is a modern task management dashboard designed to help users organize, track, and manage tasks efficiently. It provides a clean interface for creating tasks, assigning priorities, tracking statuses, and monitoring deadlines.

This project demonstrates a full-stack architecture using **React, Node.js, PostgreSQL, and Redux Toolkit**.

---
##URL To Access the Site: https://circuit-frontend.netlify.app
## Features

### Authentication
- Secure login and registration
- Protected routes for authenticated users
- Automatic redirection for unauthorized access

### Task Management
- Create tasks with title, description, priority, status, and due date
- Assign tasks to users
- Edit existing tasks
- Delete tasks with confirmation modal

### Task Dashboard
- View tasks assigned to the logged-in user
- Visual priority indicators
- Task status tracking
- Overdue task monitoring

### Filtering
- Filter tasks by **status**
- Filter tasks by **priority**
- Backend-based filtering using query parameters

### UI / UX
- Responsive layout for mobile and desktop
- Clean dashboard-style interface
- Modal forms for task creation and editing
- Confirmation dialogs for destructive actions
- Custom **404 page** for invalid routes

---

## Tech Stack

### Frontend
- React
- Redux Toolkit
- React Router
- Axios
- Tailwind CSS

### Backend
- Node.js
- Express.js

### Database
- PostgreSQL

### Tools
- Git
- Vite
- REST API Architecture

---


---

## Installation

### Clone the repository
git clone https://github.com/Balaji147/circuit.git

cd circuit

---

### Install dependencies

Frontend
cd frontend
npm i

Backend
cd frontend
npm i


---

## Environment Variables

Create a `.env` file inside the backend directory.

Example configuration:
PORT=5000

DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=circuit
DB_PORT=5432

JWT_SECRET=your_secret_key


---

## Running the Application

Start the backend server:
nodemon app.js


Start the frontend:


npm run dev


Application will run on:


Frontend: http://localhost:5173

Backend: http://localhost:3000

---

## Future Improvements

- Pagination for task lists
- Task search functionality
- Real-time updates
- Role-based access control
- Drag-and-drop task management
- Notification system

---

## Author

**Balaji M**
