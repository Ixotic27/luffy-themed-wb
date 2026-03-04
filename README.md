# Luffy - Hack-O-Holic 4.0 Frontend & Leaderboard

This repository contains the source code for the Hack-O-Holic 4.0 main website, the leaderboard admin panel, and the backend server.

## Project Structure

- `/src` - The main React + Vite frontend website (Home, Developers, Events, Bounty Board).
- `/backend` - The Node.js Express server interfacing with local MongoDB for the Leaderboard.
- `/leaderboard-admin` - A standalone React + Vite admin dashboard to manage the Bounty Board.

---

## 🚀 Getting Started

To fully run the project locally, you will need to start three separate servers along with a local instance of MongoDB.

### Prerequisites
- Node.js installed on your machine
- [MongoDB Community Edition](https://www.mongodb.com/try/download/community) installed and running locally on port `27017`

### 1. Start the Backend Server
The backend handles the database connection, CSV parsing, and API routes.
```bash
cd backend
npm install  # (Only needed the first time)
npm start
```
**Running on:** `http://localhost:5001`

### 2. Start the Leaderboard Admin Panel
The admin dashboard allows you to upload CSV files, edit team points, and toggle the public leaderboard visibility.
```bash
cd leaderboard-admin

# Install dependencies (Only needed the first time)
npm install  

# Start the admin panel locally
npm run dev
```
**Running on:** `http://localhost:5176`

### 3. Start the Main Website
The primary frontend application for users.
```bash
# In the root (Luffy) directory
npm install  # (Only needed the first time)
npm run dev
```
**Running on:** `http://localhost:5173`

---

## Features
- **Main Website:** Implements glassmorphism UI, interactive hover cards, and seamless page transitions.
- **Admin Dashboard:** Syncs local CSVs directly to MongoDB, allowing quick score updates.
- **Bounty Board (Leaderboard):** Features pagination (10 teams per page), search functionality, and a pinning feature to highlight specific teams at the bottom of the list. Visibility can be conditionally toggled to show placeholder waiting screens.
