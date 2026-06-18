import { Routes, Route } from "react-router-dom"
import AuthPage from "./pages/Auth/AuthPage"
import Dashboard from "./pages/Dashboard/Dashboard"
import Profile from "./pages/Profile/Profile"
import Goals from "./pages/Goals/Goals"
import Projects from "./pages/Projects/Projects"
import Tasks from "./pages/Tasks/Tasks"
import Activity from "./pages/Activity/Activity"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />

      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/goals" element={<ProtectedRoute><Goals /></ProtectedRoute>} />
      <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
      <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
      <Route path="/activity" element={<ProtectedRoute><Activity /></ProtectedRoute>} />
    </Routes>
  )
  
}

export default App
