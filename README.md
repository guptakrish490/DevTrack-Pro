# 🚀DevTrack Pro

DevTrack Pro is a full-stack developer productivity platform designed to help developers manage goals, projects, tasks, and progress through an integrated dashboard and activity timeline.

It aims to provide a centralized workspace for planning, tracking, and visualizing long-term development journeys.

---


## ⚡Features

### Authentication

- User Registration
- User Login
- Password Hashing using bcrypt
- JWT-based Authentication
- Protected Routes



### Goals Management

- Create goals
- Update goals
- Delete goals
- Mark goals as completed
- Search goals by title
- Filter goals by completion status
- Sort goals by creation date


### Projects Management

- Create projects
- Update projects
- Delete projects
- Associate projects with goals
- Add repository links
- Add live links
- Add tech stacks
- Search projects
- Filter projects
- Sort projects


### Tasks Management

- Create tasks
- Update tasks
- Delete tasks
- Priority management
- Status tracking
- Search tasks
- Filter tasks
- Sort tasks


### Dashboard

Provides an overview of:

- Goals count
- Projects count
- Completed tasks
- Pending tasks
- Recent tasks
- Recent projects
- Activity summary
- Streak support (planned)


### Activity Timeline

Automatic event tracking for:

- Goal creation
- Goal completion
- Project creation
- Project completion
- Task creation
- Task completion
- Profile updates


### Profile Management

- View profile
- Update profile
- Bio support
- Avatar URL support
- GitHub account links
- LeetCode account links

---


## 🎯Vision
A dynamic developer profile that combines:
- Goal tracking
- Project Management
- Task Management
- Progress Insights
- Activity timeline
- Github and Leetcode,etc Integration (Future)

---

## 🛠️Tech Stack

### Frontend
- React
- Vite


### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt

---


## 📂Project Structure
```
DevTrack-Pro
│
├── frontend
│   ├── public
│   ├── src
│   └── vite.config.js
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
│
├── LICENSE
├── .env.example
├── .gitignore
└── README.md
```
---

# 📈Current Status

## Backend MVP

Completed

### Authentication

- [x] Register
- [x] Login
- [x] JWT Middleware

### Goals

- [x] CRUD
- [x] Search
- [x] Filtering
- [x] Sorting

### Projects

- [x] CRUD
- [x] Search
- [x] Filtering
- [x] Sorting

### Tasks

- [x] CRUD
- [x] Search
- [x] Filtering
- [x] Sorting

### Dashboard

- [x] Overview endpoint

### Activity Timeline

- [x] Activity model
- [x] Automatic logging

### Profile

- [x] Get profile
- [x] Update profile

---



## Frontend

Currently under development.

---


# 🔧Future Enhancements

## Productivity

- Streak system
- Achievements
- Heatmaps
- Analytics dashboard

## Integrations

- GitHub integration
- LeetCode integration

## UX

- Responsive design
- Dark mode
- Charts and graphs
- Notifications

## Security

- Validation middleware
- Global error handling
- Password reset
- Email verification

---


# 📁Installation

## Clone Repository
```
git clone <repository-url>
```

## Backend
```
cd backend
npm install
npm run dev
```

## Frontend
```
cd frontend
npm install
npm run dev
```
---

## Environment Setup
Copy the example environment file:

#### Linux/macOS
```
cp .env.example .env
```

#### Windows(Command Prompt)
```
copy .env.example .env
```

#### Windows(PowerShell)
```
Copy-Item .env.example .env
```

##### Then update the values inside <i>.env</i>

---



# License
### MIT License

---

##### Built with❤️using MERN stack.
