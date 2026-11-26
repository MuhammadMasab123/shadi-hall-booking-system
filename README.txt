Shadi Hall Booking System - Frontend + Backend (Separate Folders)
=====================================================================

Structure:
- frontend/  -> React + Vite + Bootstrap (Landing Page + 14 Forms + Validation)
- backend/   -> Express + CORS + Mongoose + MongoDB Atlas

FRONTEND (frontend folder):
- src/components/LandingPage.jsx - Navbar, Carousel, Hall Cards, Services
- src/components/*.jsx - 14 form components, har form alag file
- src/validation/schemas.js - Zod validation rules (English messages)
- src/api.js - Axios se backend ko request bhejta hai (http://localhost:5000)

BACKEND (backend folder) - MVC format:
- index.js - sirf Express server setup, DB connect, routes mount, port 5000
- routes/ - har resource ki routes: authRoutes, hallRoutes, bookingRoutes, paymentRoutes, serviceRoutes, userRoutes, contactRoutes, feedbackRoutes
- controllers/ - har route ka logic: authController, hallController, bookingController, paymentController, serviceController, userController, contactController, feedbackController
- models.js - Mongoose models: User, Hall, Booking, Payment, Service, Contact, Feedback
- auth.js - JWT verifyToken middleware
- .env.example - MONGODB_URI ki example, is ko copy karke .env banao

FLOW: React component -> Axios (api.js) -> Express server (index.js) -> Routes (routes/) -> Controller (controllers/) -> Model (models.js / MongoDB Atlas)

MONGODB ATLAS SETUP:
1. Atlas pe free cluster, Database Access mein user, Network Access mein 0.0.0.0/0.
2. Connection string copy karo.
3. backend folder mein .env file banao, us mein likho:
   MONGODB_URI=mongodb+srv://jaw3226ad_db_user:TUMHARA_PASSWORD@cluster0.usdd59h.mongodb.net/shadihall
   (password chat mein share mat karo)

JWT TOKEN AUTH (naya - 2026-11-26):
- backend/auth.js - token banana (createToken) aur check karna (verifyToken)
- Login pe backend JWT token banata hai (1 din valid), frontend usay
  localStorage mein save karta hai (api.js - saveToken), aur har request
  pe Authorization: Bearer <token> header mein bhejta hai.
- Protected (bina login ke 401 aayega): Booking, Payment, Add/Edit Hall,
  Add Service, Profile Update, Change Password, aur Manage Data ki
  saari View / Edit / Delete calls (GET /api/halls, /api/bookings,
  /api/users, PUT, DELETE).
- Public (bina login ke bhi chalenge): Signup, Login, Forgot Password,
  Search Hall, Availability Check, Contact Us, Feedback.
- .env mein ye line bhi add karo (apna secret likho, share mat karo):
   JWT_SECRET=shadi-hall-secret-change-me

HOW TO RUN:
1. Backend terminal (backend folder):
   npm install
   npm start            -> "MongoDB Atlas connected" aana chahiye
2. Frontend terminal (frontend folder):
   npm install
   npm run dev          -> http://localhost:5173
3. Pehle Signup karo, phir Login Form se login karo - login ke baad
   "Logged in as ..." dikhega. Ab Booking / Payment / Manage Data
   chalenge. Bina login ke Manage Data kholo ge to "Please login first"
   likha aayega.
4. Form submit karo - data Atlas mein save hoga (Browse Collections mein dekho).
