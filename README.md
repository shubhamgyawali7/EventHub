# EventHub

[![Built with MERN](https://img.shields.io/badge/MERN-Stack-61DAFB?logo=react)](https://github.com)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v16%2B-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb)](https://www.mongodb.com/)

**EventHub** is a centralized event discovery and management platform for Nepal's IT community. It connects students with verified technical opportunities while helping organizations efficiently manage and promote their events.

## Problem & Solution

**The Challenge**: Students across Nepal miss valuable workshops, hackathons, and tech events due to scattered social media announcements. Meanwhile, organizations struggle to reach their target audience effectively.

**EventHub's Solution**: A unified, intelligent platform that brings all verified IT events to one searchable hub, complete with smart prioritization, location-based discovery, and automated notifications.

## Key Highlights

- **Centralized Verified Hub**: All events in one place with organization verification
- **Smart Prioritization Algorithm**: Events ranked by popularity and urgency—never miss important deadlines
- **Location-Based Search**: Discover events in your district with interactive mapping
- **Streamlined Event Management**: Organizers get real-time registration tracking and analytics
- **Role-Based Access Control**: Secure system for students, organizers, and admins
- **Seamless Registration**: One-click signup with automated deadline alerts

## Features

### For Students 👨‍🎓

- Browse and search events with advanced filters
- Location-based event discovery with interactive maps
- One-click event registration with confirmation
- Personal dashboard to track registered events
- Automated deadline alerts and notifications
- Export event information for offline access

### For Organizers 🏢

- Intuitive event creation and management interface
- Real-time registration tracking and analytics
- Participant list management and data export (CSV)
- Event image uploads and detailed descriptions
- External registration link support (Google Forms integration)
- Club portal with performance insights

### For Administrators 🔑

- Comprehensive admin dashboard for platform oversight
- Event approval and content moderation system
- User and club management with permission controls
- Role-based access control (RBAC)
- Platform analytics and reporting tools

## Tech Stack

| Layer                | Technology                   | Purpose                                       |
| -------------------- | ---------------------------- | --------------------------------------------- |
| **Frontend**         | React 19, Vite, TailwindCSS  | Modern, fast UI with responsive design        |
| **State Management** | Redux Toolkit, Redux Persist | Scalable application state                    |
| **Routing**          | React Router v7              | Client-side navigation                        |
| **Forms**            | React Hook Form              | Efficient form handling                       |
| **HTTP Client**      | Axios                        | API communication                             |
| **Mapping**          | Leaflet, React-Leaflet       | Interactive location features                 |
| **UI Components**    | Lucide React, React Icons    | Professional icon library                     |
| **Backend**          | Node.js, Express.js          | Scalable server runtime                       |
| **Database**         | MongoDB, Mongoose            | Flexible document storage with validation     |
| **Authentication**   | JWT, Bcryptjs                | Secure session management                     |
| **Security**         | Helmet, CORS                 | HTTP security headers & cross-origin handling |
| **File Management**  | Multer, Cloudinary           | Image uploads & cloud storage                 |
| **Email**            | Nodemailer, Resend           | Transactional email notifications             |
| **Logging**          | Morgan                       | HTTP request tracking                         |

## Project Structure

```
EventHub/
├── client/                    # React frontend (Vite + Redux)
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── admin/       # Admin-specific UI
│   │   │   ├── auth/        # Auth flows (Login, Signup, etc.)
│   │   │   ├── common/      # Shared components
│   │   │   ├── organizer/   # Organizer features
│   │   │   ├── layout/      # Layout wrappers
│   │   │   └── protected/   # Route guards
│   │   ├── pages/           # Full page components
│   │   ├── context/         # React Context API
│   │   ├── redux/           # Redux store & slices
│   │   ├── hooks/           # Custom React hooks
│   │   ├── services/        # API service layer
│   │   ├── routes/          # Routing configuration
│   │   ├── utils/           # Helpers & utilities
│   │   └── api/             # Axios instance setup
│   └── vite.config.js
│
└── server/                    # Express backend (Node.js)
    ├── src/
    │   ├── controllers/      # Request handlers
    │   ├── models/           # MongoDB schemas
    │   ├── routes/           # API route definitions
    │   ├── services/         # Business logic layer
    │   ├── middlewares/      # Express middlewares
    │   ├── helpers/          # Utility functions
    │   ├── config/           # Configuration (Cloudinary, etc.)
    │   ├── database.js       # MongoDB connection
    │   └── app.js            # Express app setup
    ├── uploads/              # File storage
    └── package.json
```

## Installation

### Prerequisites

- **Node.js** v16 or higher
- **MongoDB** (local instance or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster)
- **npm** or **yarn** package manager

### Setup Steps

#### 1. Clone Repository

```bash
git clone https://github.com/yourusername/EventHub.git
cd EventHub
```

#### 2. Backend Configuration

```bash
cd server
npm install

# Create .env file with required variables
cp .env.example .env

# Start backend server (development mode with auto-reload)
npm run dev
```

Backend runs on: **http://localhost:5000** (or your configured PORT)

#### 3. Frontend Configuration

```bash
cd ../client
npm install

# Start frontend development server
npm run dev
```

Frontend runs on: **http://localhost:5173**

## Environment Variables

### Server (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/EventHub

# Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# CORS
CORS_ORIGIN=http://localhost:5173

# Cloudinary (Image Upload)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email Service
SMTP_HOST=smtp.your-email-provider.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-app-password
```

### Client (.env.local)

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## API Endpoints

### Authentication

| Method | Endpoint           | Description               |
| ------ | ------------------ | ------------------------- |
| POST   | `/api/auth/signup` | Register new user         |
| POST   | `/api/auth/login`  | User login with JWT token |
| POST   | `/api/auth/logout` | Clear session & logout    |

### Events

| Method | Endpoint          | Description                    |
| ------ | ----------------- | ------------------------------ |
| GET    | `/api/events`     | List all events (with filters) |
| GET    | `/api/events/:id` | Get event details              |
| POST   | `/api/events`     | Create event (auth required)   |
| PUT    | `/api/events/:id` | Update event details           |
| DELETE | `/api/events/:id` | Delete event                   |

### Registrations

| Method | Endpoint                      | Description                  |
| ------ | ----------------------------- | ---------------------------- |
| POST   | `/api/registrations/:eventId` | Register user for event      |
| GET    | `/api/registrations/:eventId` | Get event registrations      |
| GET    | `/api/registrations/club/all` | Get all club's registrations |
| DELETE | `/api/registrations/:id`      | Cancel registration          |

### Clubs

| Method | Endpoint         | Description                 |
| ------ | ---------------- | --------------------------- |
| GET    | `/api/clubs`     | List all clubs              |
| GET    | `/api/clubs/:id` | Get club details            |
| POST   | `/api/clubs`     | Create club (auth required) |
| PUT    | `/api/clubs/:id` | Update club info            |

### Admin

| Method | Endpoint                      | Description                   |
| ------ | ----------------------------- | ----------------------------- |
| GET    | `/api/admin/dashboard`        | Platform analytics            |
| GET    | `/api/admin/users`            | List all users                |
| GET    | `/api/admin/clubs`            | List all clubs for moderation |
| PUT    | `/api/admin/clubs/:id/verify` | Verify/approve club           |

## Authentication & Authorization

EventHub uses **JWT (JSON Web Tokens)** for secure authentication with role-based access control:

| Role          | Permissions                                            |
| ------------- | ------------------------------------------------------ |
| **User**      | Browse events, register, view profile                  |
| **Organizer** | Manage events, view registrations, analytics           |
| **Admin**     | Full platform control, event approval, user management |

Tokens are stored in HTTP-only cookies for enhanced security against XSS attacks.

## Scripts & Commands

### Frontend Scripts

```bash
npm run dev       # Start development server (hot-reload)
npm run build     # Build for production
npm run lint      # Run ESLint code checker
npm run preview   # Preview production build locally
```

### Backend Scripts

```bash
npm run dev       # Start with nodemon (auto-restart on changes)
npm run start     # Run production server
npm test          # Run test suite
```

## Screenshots

### Event Discovery

![EventHub Homepage](./client/public/screenshots/1.jpeg)

### Event Registration Flow

![Event Registration](./client/public/screenshots/2.jpeg)

### Home Page

![User Dashboard](./client/public/screenshots/3.jpeg)

### Organizer Dashboard

![Organizer Portal](./client/public/screenshots/4.jpeg)

### Event List Page

![Admin Dashboard](./client/public/screenshots/5.jpeg)

### Admin Dashboard

![Location Search](./client/public/screenshots/6.jpeg)

### Student Dashboard

![Mobile View](./client/public/screenshots/7.png)

## Usage

1. **For Students**: Sign up, browse events by location/category, register with one click
2. **For Organizers**: Create club account, post events, track registrations in real-time
3. **For Admins**: Verify organizations, moderate content, monitor platform health

## Authors

- **Shubham Gyawali** — Full Stack Developer
- **Nirmal Bashyal** — Frontend Developer
- **Ujjal Pandey** — Frontend Developer

## License

This project is licensed under the **ISC License** — see the [LICENSE](LICENSE) file for details.

## Copyright

© Shubham Gyawali, All rights reserved.

---

**Made with ❤️ for Nepal's IT Community**
