import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import './index.css'
import { Signup } from './pages/Signup'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'
import { Activity_Logging } from './pages/Activity_Logging'
import { Dashboard } from './pages/Dashboard'

function App() {
  return (
    <div className="h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/activity-logging" element={<Activity_Logging />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
