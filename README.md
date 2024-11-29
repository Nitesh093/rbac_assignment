# Express Authentication and RBAC System

## Overview
This project implements a basic **Authentication System** and **Role-Based Access Control (RBAC)** using **Node.js** and **Express.js**. It supports user registration, login, and access control to secure routes based on roles.

---

## Features

### User Authentication
- **Register**: Allows users to register with a username and password.
- **Login**: Users log in to receive a JWT for secure access to protected routes.

### Role-Based Access Control
- Assigns roles to users for fine-grained permission management.
- Middleware enforces role-based restrictions on protected routes.

### Protected Routes
- `/profile`: Authenticated users can view their profile.
- `/all`: Accessible only to users with the `read:all` permission.

---


## .env file
MONGODB_URI=mongodb://localhost:27017/rbac_db
  
JWT_SECRET=your_very_secret_and_long_random_string_here

PORT=5000




## setup and Installation
Prerequisites
Node.js and npm installed on your system.
Installation Steps
Clone the Repository


npm install


Run the Application

npm start
