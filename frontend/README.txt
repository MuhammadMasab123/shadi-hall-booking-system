Shadi Hall Booking System - React + Bootstrap + Express + MongoDB Atlas
==========================================================================

FRONTEND (React + Vite + Bootstrap)
- Landing page: src/components/LandingPage.jsx (Navbar, Carousel, Hall Cards, Services)
- 14 forms, har form ka apna alag component: src/components/*.jsx
- Validation: React Hook Form + Zod + zodResolver, rules in src/validation/schemas.js
- Forms submit: src/api.js se backend ko POST karte hain (http://localhost:5000)

BACKEND (Express + CORS + Mongoose)
- server/index.js - Express server, port 5000, saare API routes
- server/models.js - Mongoose models: User, Hall, Booking, Payment, Service, Contact, Feedback
- server/package.json - express, mongoose, cors, dotenv

MONGODB ATLAS SETUP (pehli dafa):
1. mongodb.com/atlas pe free account banao, free cluster (M0) banao.
2. Database Access mein ek user banao (username + password yaad rakho).
3. Network Access mein "Add IP Address" -> "Allow Access from Anywhere" (0.0.0.0/0).
4. Cluster pe Connect -> Drivers -> connection string copy karo.
   Example: mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/shadihall
5. server folder mein .env.example ko copy karke .env naam do,
   aur MONGODB_URI= wali line mein apni connection string paste karo.
   Password chat mein kabhi share mat karo.

HOW TO RUN:
1. Zip extract karo.
2. Frontend terminal (VS Code, root folder):
   npm install
   npm run dev          -> http://localhost:5173
3. Backend terminal (VS Code, server folder) - ALAG terminal:
   cd server
   npm install
   npm start            -> http://localhost:5000
   "MongoDB Atlas connected" aana chahiye.
4. Browser mein form bharo aur submit karo - data Atlas mein save hoga.
   Atlas pe: Browse Collections mein users, bookings, halls, payments, etc. dikhenge.

Note: Backend chale baghair form submit karne pe error aayega ("Failed to fetch").
Pehle backend start karo, phir frontend.
