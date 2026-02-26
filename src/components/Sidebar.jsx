import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './sidebar.css'
import { useAuth } from '../context/AuthContext'

export default function Sidebar(){
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  function handleLogout(){
    logout()
    navigate('/login')
  }

  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="brand">Barangay</div>
      <nav>
        <ul>
          {/* Role-aware links */}
          {user?.role === 'staff' || user?.role === 'admin' ? (
            <>
              <li><NavLink to="/admin" end>Dashboard</NavLink></li>
              <li><NavLink to="/manage-complaints">Manage Complaints</NavLink></li>
              <li><NavLink to="/manage-documents">Manage Document Requests</NavLink></li>
              <li><NavLink to="/manage-residents">Manage Residents</NavLink></li>
              <li><NavLink to="/admin/reports">Reports & Analytics</NavLink></li>
              <li><NavLink to="/admin/settings">System Settings</NavLink></li>
            </>
          ) : (
            <>
              <li><NavLink to="/dashboard" end>Dashboard</NavLink></li>
              <li><NavLink to="/submit-complaint">Submit Complaint</NavLink></li>
              <li><NavLink to="/document-request">Request Document</NavLink></li>
              <li><NavLink to="/complaint-history">Complaint History</NavLink></li>
              <li><NavLink to="/document-history">Document History</NavLink></li>
              <li><NavLink to="/accessibility">Accessibility Settings</NavLink></li>
            </>
          )}
          <li className="logout"><button className="linklike" aria-label="Logout" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
    </aside>
  )
}
