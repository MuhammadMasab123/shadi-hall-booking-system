# Shadi Hall Booking System

University Web Technologies project — hall booking for 3 stakeholders: **Admin, Customer, Hall Manager**.

## Stack

- **Frontend:** React + Vite + Bootstrap 5, React Hook Form + Zod validation (English error messages)
- **Backend:** Express + CORS + Mongoose, MongoDB Atlas
- **Auth:** JWT (login token, 1-day expiry) + role-based authorization

## Flow

```
React -> Axios (src/api.js) -> Express server (index.js)
  -> Routes (backend/routes/) -> Controller (backend/controllers/)
  -> Model (backend/models.js) -> MongoDB Atlas
```

## Features

- Landing page (navbar, carousel, hall cards, services)
- 14 forms, each a separate React component: Signup, Login, Forgot Password, Search Hall, Availability Check, Booking, Payment, Add Hall, Edit Hall, Add Service/Package, Profile Update, Change Password, Contact Us, Feedback/Review
- CRUD: Manage Data page (View / Edit / Delete) for Halls, Bookings and Users
- Authentication: login returns a JWT token, frontend saves it in localStorage and sends it as `Authorization: Bearer <token>` on every request
- Authorization: Booking/Payment — Customer only; Add/Edit Hall and Add Service — Admin + Hall Manager; Users/Payments/Services/Contact/Feedback view/delete — Admin only

## Run it

### Backend

```bash
cd backend
npm install
npm start
```

Create `backend/.env` first (see `.env.example`):

```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/shadihall
JWT_SECRET=<redacted>
```

Server runs on http://localhost:5000 — expect `MongoDB Atlas connected`.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App runs on http://localhost:5173. Signup first, then Login, then try Booking or Manage Data.

## Test the roles

- Login as **Customer** → Booking works, Add Hall gives 403, Manage Data button is hidden.
- Login as **Admin** → Add Hall works, Booking gives 403, Manage Data shows all tables.
- Without login → "Please login first" (401).
