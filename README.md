# EventHub

A smart, centralized platform for discovering and managing IT events across Nepal. EventHub connects students with verified technical opportunities, helping IT clubs and organizations reach their target audience efficiently.

## 🎯 Overview

EventHub solves the critical challenge of fragmented event information in Nepal's IT community. Currently, students miss valuable workshops and hackathons due to scattered social media announcements, while organizations struggle to reach interested participants.

Our platform provides:

- **Centralized Hub**: All IT events in one verified, searchable location
- **Smart Prioritization**: Events ranked by popularity and urgency, ensuring students never miss important deadlines
- **Verified Organizations**: Admin-verified clubs and organizations guarantee authentic, quality events
- **Location-Based Discovery**: Find workshops and bootcamps in your district (Butwal, Kathmandu, etc.)
- **Easy Registration**: One-click event signup with automated deadline alerts
- **For Organizers**: Streamlined event management, real-time registration tracking, and participant analytics

Built with modern technologies (MERN Stack) for reliability and performance, EventHub is designed specifically for Nepal's IT community while maintaining scalability for future expansion.

## ✨ Key Features

### For Students

- **Event Discovery**: Browse and search for campus events with detailed information
- **Event Registration**: Easy registration for events with verification systems
- **Event Calendar**: Visual calendar view of upcoming events
- **User Dashboard**: Track registered events and manage profiles
- **Map Integration**: Interactive map to locate event venues

### For Organizations/Clubs

- **Event Creation**: Intuitive event creation and management tools
- **Club Portal**: Dedicated portal for managing club activities
- **Event Management**: List, update, modify, and delete events
- **Registration Dashboard**: Real-time management of participant lists
- **Data Export**: Export registration data to CSV for offline usage
- **Google Forms Integration**: Support for events using external registration links

### For Administrators

- **Admin Dashboard**: Comprehensive overview of all events and users
- **Event Management**: Approve, reject, or manage events
- **User Management**: Manage user accounts and permissions
- **Club Management**: Oversee all registered organizations
- **Role-Based Access Control**: Secure access control system

## 🛠️ Tech Stack

### Frontend

- **React 19**: Modern UI library for building component-based interfaces
- **Vite**: Next generation frontend build tool for rapid development
- **Redux Toolkit**: State management for complex application data
- **TailwindCSS**: Utility-first CSS framework for responsive design
- **React Router v7**: Client-side routing
- **Axios**: HTTP client for API communication
- **React Hook Form**: Efficient form state management
- **Leaflet & React-Leaflet**: Interactive mapping capabilities
- **Lucide React**: Beautiful icon library

### Backend

- **Node.js & Express.js**: Server runtime and web framework
- **MongoDB & Mongoose**: Document database and ODM
- **JWT**: Secure authentication mechanism
- **Bcryptjs**: Password hashing and security
- **Multer**: File upload handling
- **Helmet**: Security middleware for HTTP headers
- **CORS**: Cross-Origin Resource Sharing support
- **Morgan**: HTTP request logger

## 📂 Project Structure

```
EventHub/
├── client/                          # React frontend application
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   │   ├── admin/             # Admin-specific components
│   │   │   ├── auth/              # Authentication components
│   │   │   ├── common/            # Shared components
│   │   │   ├── organizer/         # Organizer-specific components
│   │   │   └── protected/         # Route protection components
│   │   ├── pages/                 # Page components
│   │   │   ├── admin/             # Admin pages
│   │   │   ├── auth/              # Login/Signup pages
│   │   │   ├── club/              # Club-related pages
│   │   │   ├── public/            # Public-facing pages
│   │   │   └── user/              # User profile pages
│   │   ├── context/               # React context for state management
│   │   ├── hooks/                 # Custom React hooks
│   │   ├── redux/                 # Redux store and slices
│   │   ├── services/              # API service files
│   │   ├── routes/                # Routing configuration
│   │   ├── api/                   # API configuration
│   │   └── utils/                 # Utility functions
│   ├── package.json
│   └── vite.config.js
│
└── server/                          # Express backend application
    ├── src/
    │   ├── controllers/            # Route controllers
    │   ├── models/                 # Database schemas
    │   ├── routes/                 # API routes
    │   ├── services/               # Business logic
    │   ├── middlewares/            # Express middlewares
    │   ├── helpers/                # Helper functions
    │   ├── database.js             # Database connection
    │   └── app.js                  # Express app configuration
    ├── uploads/                    # File upload storage
    ├── package.json
    └── .env                        # Environment variables
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/EventHub.git
cd EventHub
```

#### 2. Backend Setup

```bash
cd server
npm install

# Create a .env file in the server directory
# Configure your MongoDB connection and JWT secret
cp .env.example .env

npm run dev
```

#### 3. Frontend Setup

```bash
cd ../client
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at the configured port.

## 🔧 Environment Variables

### Server (.env)

```env
PORT=your_port
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CORS_ORIGIN=http://localhost:5173
NODE_ENV=development
```

### Client (.env.local)

```env
VITE_API_BASE_URL=http://localhost:your_backend_port/api
```

## 📝 API Endpoints

### Authentication

- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Events

- `GET /api/events` - List all events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event (authenticated)
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### Clubs

- `GET /api/clubs` - List all clubs
- `GET /api/clubs/:id` - Get club details
- `POST /api/clubs` - Create club (authenticated)

### Registrations

- `POST /api/registrations/:eventId` - Register for a specific event
- `GET /api/registrations/club/all` - Club: View all registrations for owned events
- `GET /api/registrations/:eventId` - Get participants for a single event
- `DELETE /api/registrations/:id` - Cancel registration

## 🔐 Authentication & Authorization

EventHub implements a role-based access control system with three user roles:

1. **User**: Can browse events and register
2. **Organizer**: Can create and manage club events
3. **Admin**: Full platform administration

JWT tokens are used for secure authentication and are stored securely in HTTP-only cookies.

## 🎨 Features in Detail

### Event Management

- Create events with detailed information
- Upload event images
- Set event dates, times, and locations
- Define event capacity and registration limits
- View registration analytics

### Registration System

- Student registration for events
- Email verification
- Registration confirmation
- Attendance tracking

### Map Integration

- Interactive venue location picker
- Event location display on map
- Search events by location

## 📦 Scripts

### Frontend

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run preview  # Preview production build
```

### Backend

```bash
npm run dev      # Start with nodemon (auto-reload)
npm run start    # Start production server
npm test         # Run tests
```


## 👥 Authors

- **Shubham Gyawali - FullStack Developer**
- **Nirmal Bashyal - Frontend Developer**
- **Ujjal Pandey - Frontend Developer**


## 📄 License

This project is licensed under the ISC License - see the LICENSE file for details.

---
