import 'remixicon/fonts/remixicon.css';
import { Routes, Route } from "react-router-dom"
import AuthPage from "./pages/Auth/AuthPage"
import Dashboard from "./pages/Dashboard/Dashboard"
import Profile from "./pages/Profile/Profile"
import Goals from "./pages/Goals/Goals"
import Projects from "./pages/Projects/Projects"
import Tasks from "./pages/Tasks/Tasks"
import Activity from "./pages/Activity/Activity"
import ProfileSettings from './pages/Settings/profile/ProfileSettings';
import ProtectedRoute from "./components/auth/ProtectedRoute"
import Layout from "./components/layout/Layout"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <>
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


        <Route path="/settings/profile" element={
          <ProtectedRoute>
            <Layout>
              <ProfileSettings />
            </Layout>
          </ProtectedRoute>
        } />

      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        pauseOnHover
        draggable
        theme="dark"
        toastClassName="bg-[#18181f] text-[#dbe8f0] border border-white/20 rounded-xl shadow-lg"
        bodyClassName="font-open-sans text-sm"
        progressClassName="bg-violet-500"
      />

    </>
  )

}

export default App
