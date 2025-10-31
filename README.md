Project Description

This is a backend API for a Social Media Blog Post Application built using Node.js, Express, and MySQL.
The system allows users to register, log in, create blog posts, comment on posts, and manage their content securely.
It includes session-based authentication, password hashing, and database relationships between users, posts, and comments.

The API is fully documented using Swagger UI, 
making it easy to test and integrate with frontend applications. It also includes validation,
error handling, and data protection best practices to ensure a secure and scalable backend environment.

Key Features

🔐 User Authentication – Secure session-based login and registration with hashed passwords.
📝 Post Management – Create, read, update, and delete blog posts (CRUD operations).
💬 Comments System – Users can comment on posts, with constraints preventing post deletion if comments exist.
🧩 MySQL Integration – Structured database with foreign key relationships between users, posts, and comments.
📘 Swagger Documentation – Full API documentation for all routes and schemas.
⚙️ Validation & Error Handling – Ensures clean input and descriptive error messages.


Tech Stack

Backend: Node.js, Express.js
Database: MySQL
Authentication: Express-session, bcrypt

Documentation: Swagger UI

Other Tools: dotenv, body-parser, cors
