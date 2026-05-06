CRM Application

A full-stack Customer Relationship Management (CRM) application built as part of a developer intern assessment. The app allows a sales team to manage leads, track activity, add notes, and monitor pipeline performance through a dashboard.

---

## Project Overview

This CRM application enables sales teams to:
- Track leads through a full sales pipeline
- Filter, search, and sort leads by various criteria
- Add notes and monitor status changes via an activity timeline
- View pipeline performance through a dashboard with charts
- Identify stale leads that need follow-up

---

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Frontend     | React, React Router, Tailwind CSS   |
| HTTP Client  | Axios                               |
| Charts       | Recharts                            |
| Backend      | Node.js, Express                    |
| Database     | MongoDB Atlas (Mongoose ODM)        |
| Auth         | JWT (JSON Web Tokens) + bcryptjs    |

---

## Features Implemented

### Core Features
- Email/password login with JWT authentication
- Protected routes — all pages require login
- Full leads CRUD (Create, Read, Update, Delete)
- Notes per lead
- Lead fields: name, company, email, phone, source, salesperson, status, deal value

### Bonus Features
- **Search** — search leads by name, company, or email
- **Filtering** — filter by status, source, and salesperson (dynamic dropdown)
- **Sorting** — sort by deal value (high/low) or date (newest/oldest)
- **Color-coded status badges** — visual indicators for each pipeline stage
- **Stale lead detection** — flags leads with no activity in 7+ days
- **Activity timeline** — combines notes and status changes in chronological order
- **Dashboard charts** — bar chart showing lead distribution by status
- **Dashboard stats** — total leads, won deals, total revenue, stale leads count

---

## How to Run Locally

### Prerequisites
- Node.js (v16 or higher)
- A MongoDB Atlas account (free tier)
- Git

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/crm-app.git
cd crm-app
```

### 2. Set up the Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000


Start the backend server:
```bash
npm run dev
```

The backend runs on `http://localhost:5000`

### 3. Set up the Frontend
Open a new terminal:
```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` folder:
REACT_APP_API_URL=http://localhost:5000/api


Start the frontend:
```bash
npm start
```

The frontend runs on `http://localhost:3000`

---

## Environment Variables

### Backend (`backend/.env`)
| Variable     | Description                                 |
|--------------|---------------------------------------------|
| `MONGO_URI`  | MongoDB Atlas connection string             |
| `JWT_SECRET` | Secret key for signing JWT tokens           |
| `PORT`       | Port for the Express server (default: 5000) |

### Frontend (`frontend/.env`)
| Variable            | Description                  |
|---------------------|------------------------------|
| `REACT_APP_API_URL` | Base URL for the backend API |

---

## Test Login Credentials
Email: admin@example.com Password: password123


---

## Database Setup

This app uses **MongoDB Atlas** (cloud-hosted MongoDB).

1. Create a free account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free M0 cluster
3. Create a database named `crm`
4. Create a collection named `users`
5. Insert the test user document:

```json
{
  "email": "admin@example.com",
  "password": "$2b$10$YOUR_BCRYPT_HASH_HERE"
}
```

To generate the bcrypt hash, run this in the backend folder:
```bash
node -e "const b = require('bcryptjs'); b.hash('password123', 10).then(h => console.log(h))"
```

6. Copy the Atlas connection string and add it to `backend/.env` as `MONGO_URI`


---

## API Endpoints

| Method | Endpoint           | Description               | Auth Required |
|--------|--------------------|---------------------------|---------------|
| POST   | /api/auth/login    | Login and get JWT token   | No            |
| GET    | /api/leads         | Get all leads (+ filters) | Yes           |
| POST   | /api/leads         | Create a new lead         | Yes           |
| GET    | /api/leads/:id     | Get a single lead         | Yes           |
| PUT    | /api/leads/:id     | Update a lead             | Yes           |
| DELETE | /api/leads/:id     | Delete a lead             | Yes           |
| GET    | /api/notes/:leadId | Get notes for a lead      | Yes           |
| POST   | /api/notes/:leadId | Add a note to a lead      | Yes           |

---

## Known Limitations

- **Single user system** — no registration flow. The test user must be manually inserted into MongoDB. A future version would include registration and role-based access control.
- **No email notifications** — a production CRM would send email reminders for stale leads.

---

## Reflection

### What went well

Having some full-stack experience coming in meant I could move quickly on the backend — setting up Express routes, Mongoose models, and JWT auth felt familiar. The separation into models, routes, and middleware kept things clean and easy to navigate as the codebase grew. On the frontend, Tailwind CSS made the UI iteration fast, and the component structure stayed manageable throughout.

### What I learned

The trickiest part was getting React state and context right. Managing the authenticated user globally through AuthContext, making sure protected routes redirect correctly, and keeping the leads list in sync after creates, deletes, and filter changes — these required more careful thinking than I initially expected. The dynamic salesperson dropdown was a good example: I had to rethink where state lives and how it flows down to child components to avoid stale data without forcing a full page refresh.

This project also reinforced how the pieces of a full-stack app connect as a system — how a JWT signed in Express ends up as an Authorization header on every axios request, and how Mongoose query filters map directly to what the user selects in the UI.
