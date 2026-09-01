# DevTrack-Pro

> **Code. Commit. Track. Consistent.**

A production-deployed **MERN-based developer productivity platform** designed to help developers manage goals, projects, tasks, and activity history in one place. Unlike a traditional to-do application, DevTrack focuses on the complete developer workflow with secure authentication, automatic activity tracking, streak management, and production-ready backend architecture.

• "Live Demo" (https://devtrackpro.vercel.app) <br>
• "Backend API" (https://devtrack-pro-frb0.onrender.com) <br>
• "Report Bug" (../../issues) <br>
• "Request Feature" (../../issues)<br>

---

## 🏷️ Badges

### Frontend / Styling / Validation
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white) 
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white) 
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white) 
![Axios](https://img.shields.io/badge/Axios-5A29E4?logo=axios&logoColor=white) 
![Zod](https://img.shields.io/badge/Zod-Validation-8A2BE2)

### Backend / Database / Deployment / Auth
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white) 
![Express](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white) 
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white) 
![JWT](https://img.shields.io/badge/Auth-JWT-orange) 
![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel) 
![Render](https://img.shields.io/badge/Backend-Render-46E3B7) 
![License](https://img.shields.io/badge/License-MIT-blue)



---

## Problem Statement

Developers often split their workflow across multiple applications:

- Task managers
- Project boards
- Goal trackers
- Progress notes

This fragmentation makes it difficult to maintain consistency and visualize overall progress.

DevTrack-Pro combines these workflows into a single platform while automatically recording meaningful activities, helping developers stay accountable and maintain momentum through streak tracking.

---

## Demo

### Live Application

> **Frontend**: https://devtrackpro.vercel.app

> **Backend**: https://devtrack-pro-frb0.onrender.com

### Demo Video

> «📹 Coming Soon»

### Screenshots

> «📹 Coming Soon»

---

## Features

### Authentication & Security

- User Registration
- Secure Login
- JWT Authentication
- Refresh Token Sessions
- HTTP-only Cookie Authentication
- Protected Routes
- Authorization Middleware
- Secure Logout

### Productivity

- Goal Management
- Project Management
- Task Management
- Project Status Tracking
- Automatic Activity Logging
- Developer Streak Tracking
- Profile Management

### Dashboard

- Project Statistics
- Goal Overview
- Task Summary
- Recent Activity Feed
- Real-time Updates

### Search & Navigation

- Search Functionality
- Pagination
- Optimized Data Fetching

### Production Features

- MongoDB Atlas Integration
- Render Backend Deployment
- Vercel Frontend Deployment
- Environment-based Configuration

---

## ⚙️ Tech Stack

| Layer              | Technology                          |
|--------------------|-------------------------------------|
| **Frontend**       | React + Vite                        |
| **Styling**        | Tailwind CSS                        |
| **Backend**        | Node.js + Express                   |
| **Database**       | MongoDB Atlas                       |
| **Authentication** | JWT                                 |
| **Validation**     | Zod                                 |
| **Deployment**     | Vercel + Render                     |
| **API Communication** | Axios                            |


## Architecture

### High-Level Architecture

<AsyncImage query="clean MERN architecture diagram React Axios Express middleware controllers MongoDB JWT HTTP-only cookies" aspectRatio="16:9" width="100%" maxHeight=420/>

#### Request Flow

```
React UI
   │
   ▼
Axios
   │
   ▼
Express Routes
   │
   ▼
Authentication Middleware
   │
   ▼
Validation Middleware (Zod)
   │
   ▼
Controllers
   │
   ▼
MongoDB Atlas
   │
   ▼
JSON Response
   │
   ▼
React State Update
```

---

## Folder Structure

```
DevTrack-Pro/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── validators/
│   ├── utils/
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── context/
│   │   └── App.jsx
│   ├── public/
│   ├── vercel.json
│   ├── .env.example
│   └── package.json
│
├── README.md
└── LICENSE
```

---

## Database Design

### Collections

#### Users
Stores user authentication and profile information.

#### Goals
Tracks personal learning and development goals.

#### Projects
Stores developer projects and their current progress.

#### Tasks
Represents actionable work items linked to projects.

#### Activities
Automatically records important user actions to generate activity history and streaks.

#### RefreshToken
Stores Refresh Tokens for JWT sessions refreshing.

---

## Security

**Security was treated as a core engineering concern rather than an afterthought.**

#### Implemented protections include:

- JWT Authentication
- HTTP-only Cookies
- Refresh Token Sessions
- Helmet Security Headers
- Rate Limiting
- Zod Validation
- Protected Routes
- Authorization Checks

---

## Performance Optimizations

**Several backend optimizations were implemented to improve efficiency.**

### MongoDB "lean()"

"lean()" was introduced where full Mongoose documents weren't required, reducing unnecessary overhead during read operations.

### Pagination

Large datasets are paginated instead of loading everything at once.

Optimized API Structure

Business logic remains separated from routing through controllers and middleware.

---

## Local Setup

#### Clone Repository
```
git clone https://github.com/YOUR_USERNAME/DevTrack-Pro.git
cd DevTrack-Pro
```

#### Backend Setup
```
cd backend
npm install
npm run dev
```

Runs on:
>http://localhost:3000

#### Frontend Setup
```
cd ../frontend
npm install
npm run dev
```

Runs on:
> http://localhost:5173

---

## Environment Variables
Backend:
```env
MONGO_URI=
JWT_SECRET=
JWT_REFRESH_SECRET=
CLIENT_URL=
NODE_ENV=
```
Frontend:
```env
VITE_API_URL=
```

---

## Deployment

### Frontend

Hosted on **Vercel**

- Automatic deployments from GitHub
- SPA routing support via "vercel.json"

### Backend

Hosted on **Render**

- Express API
- Environment variable management
- Production deployment

### Database

Hosted on **MongoDB Atlas**

- Cloud database
- Production migration from local MongoDB

> **«Note:** The backend is hosted on Render's free tier, so the first request after inactivity may take a few seconds.»

---

## Challenges Faced

Building DevTrack-Pro involved solving real production issues beyond feature development.

Some of the biggest challenges included:

- MongoDB Atlas migration
- Standard vs SRV connection strings
- Database migration
- CORS configuration
- HTTP-only cookie handling
- Linux case-sensitivity on Vercel
- React Router deployment routing
- Production debugging across multiple platforms

These challenges significantly improved understanding of backend systems beyond local development.

---

## Future Roadmap (v1.1)

Planned improvements include:

- Better loading states
- Improved mobile experience
- Empty-state illustrations
- Notification system
- Enhanced analytics
- GitHub integration
- Advanced productivity insights

---

## What I Learned

DevTrack-Pro taught me much more than building CRUD features.

The project helped me gain hands-on experience with:

- Production authentication
- Secure backend architecture
- REST API design
- Middleware-driven architecture
- Cloud database migration
- Full-stack deployment
- Real-world debugging

The biggest lesson was that building software doesn't end when features are complete—the hardest part often begins during deployment and production debugging.

---

## Contributing

Contributions, suggestions, and feedback are always welcome.

1. Fork the repository.
2. Create a new branch.
3. Make your changes.
4. Submit a Pull Request.

---

## License

This project is licensed under the MIT License.

---

## Connect

If you'd like to discuss backend engineering, full-stack development, or developer productivity tools, feel free to connect.
- **LinkedIn**: [Krish Gupta](https://linkedin.com/in/krish--gupta)
- **GitHub**: [guptakrish490](https://github.com/guptakrish490)

---

> «Built with ❤️ while learning production-grade backend engineering.» 