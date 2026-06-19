import 'remixicon/fonts/remixicon.css';
import { Routes, Route } from "react-router-dom"
import AuthPage from "./pages/Auth/AuthPage"
import Dashboard from "./pages/Dashboard/Dashboard"
import Profile from "./pages/Profile/Profile"
import Goals from "./pages/Goals/Goals"
import Projects from "./pages/Projects/Projects"
import Tasks from "./pages/Tasks/Tasks"
import Activity from "./pages/Activity/Activity"
import ProtectedRoute from "./components/auth/ProtectedRoute"
import Layout from "./components/layout/Layout"

function App() {

  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />

      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/profile" element={
        <ProtectedRoute>
          <Layout>
            <Profile />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/goals" element={
        <ProtectedRoute>
          <Layout>
            <Goals />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/projects" element={
        <ProtectedRoute>
          <Layout>
            <Projects />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/tasks" element={
        <ProtectedRoute>
          <Layout>
            <Tasks />
          </Layout>
        </ProtectedRoute>
      } />

      <Route path="/activity" element={
        <ProtectedRoute>
          <Layout>
            <Activity />
          </Layout>
        </ProtectedRoute>
      } />

    </Routes>
  )

}

export default App
