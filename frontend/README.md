# Spirit11 Project

## Overview

Spirit11 is a cricket platform developed by Team 2GB. The application consists of a Node.js backend API and a Vite-powered React frontend.

## Prerequisites

- Node.js (v14 or newer)
- MySQL server (XAMPP recommended)
- npm or yarn package manager

## Getting Started

### Database Setup

1. Start your MySQL server
2. Create a new database:

```sql
CREATE DATABASE `xcelerate.spirit11`;
```

### Backend Configuration

1. Navigate to the backend directory
2. Create a `.env` file with the following configuration:

```
PORT=5000

DB_NAME=xcelerate.spirit11
DB_USERNAME=root
DB_PASSWORD=
DB_HOST=
DB_PORT=3306

FRONTEND_URL=http://localhost:5173
```

3. Adjust the database credentials according to your MySQL setup

### Frontend Configuration

1. Navigate to the frontend directory
2. Create a `.env` file with the following configuration:

```
VITE_BACKEND_URL=http://localhost:5000
```

### Installation

1. Install backend dependencies:

```bash
cd backend
npm install
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

### Initialize Database

1. From the backend directory, run:

```bash
npm run initdb
```

This will create the necessary tables and seed initial data.

## Running the Application

1. Start the backend server:

```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend application:

```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to http://localhost:5173

## Technologies

- **Backend**: Node.js, Express, MySQL
- **Frontend**: React, Vite
- **Database**: MySQL

## Contact

Team 2GB - mrclocktd@gmail.com
