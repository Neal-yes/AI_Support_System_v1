import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Chat from './pages/Chat'
import Admin from './pages/Admin'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/chat" replace /> : 
            <Login onLogin={() => setIsAuthenticated(true)} />
          } 
        />
        <Route 
          path="/chat" 
          element={
            isAuthenticated ? 
            <Chat onLogout={() => setIsAuthenticated(false)} /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route 
          path="/admin/*" 
          element={
            isAuthenticated ? 
            <Admin onLogout={() => setIsAuthenticated(false)} /> : 
            <Navigate to="/login" replace />
          } 
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  )
}

export default App

